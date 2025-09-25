"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, name: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  userProfile: UserProfile | null
}

interface UserProfile {
  email: string
  name: string
  subscriptionStatus: 'active' | 'cancelled' | 'past_due' | 'none'
  subscriptionType: 'monthly' | 'annual' | 'none'
  stripeCustomerId?: string
  subscriptionId?: string
  purchasedContent?: string[]
  freeAccess?: boolean
  createdAt: any
  lastLogin: any
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        try {
          // Fetch user profile from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile)
            // Update last login
            await setDoc(doc(db, 'users', user.uid), {
              lastLogin: serverTimestamp()
            }, { merge: true })
          } else {
            // Create basic profile if it doesn't exist
            const newProfile = {
              email: user.email || '',
              name: user.displayName || 'User',
              subscriptionStatus: 'none' as const,
              subscriptionType: 'none' as const,
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp()
            }
            await setDoc(doc(db, 'users', user.uid), newProfile)
            setUserProfile(newProfile as UserProfile)
          }
        } catch (error) {
          console.error('Error fetching/creating user profile:', error)
          // Set basic profile from auth user if Firestore fails
          setUserProfile({
            email: user.email || '',
            name: user.displayName || 'User',
            subscriptionStatus: 'none',
            subscriptionType: 'none',
            createdAt: new Date(),
            lastLogin: new Date()
          })
        }
      } else {
        setUserProfile(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signUp = async (email: string, password: string, name: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    // Create user profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email,
      name,
      subscriptionStatus: 'none',
      subscriptionType: 'none',
      purchasedContent: [],
      freeAccess: false,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    })
  }

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const { user } = await signInWithPopup(auth, provider)

    // Check if user profile exists, if not create one
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name: user.displayName,
        subscriptionStatus: 'none',
        subscriptionType: 'none',
        purchasedContent: [],
        freeAccess: false,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      })
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    setUserProfile(null)
  }

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    resetPassword,
    userProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}