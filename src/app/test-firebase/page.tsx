"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"

export default function TestFirebasePage() {
  const [results, setResults] = useState<string[]>([])
  const [testing, setTesting] = useState(false)

  const addResult = (message: string) => {
    setResults(prev => [...prev, message])
    console.log(message)
  }

  const testFirebase = async () => {
    setTesting(true)
    setResults([])

    try {
      // Test 1: Firebase is initialized
      addResult("✅ Firebase initialized successfully")
      addResult(`Project ID: ${auth.app.options.projectId}`)

      // Test 2: Try to create a test user
      const testEmail = `test${Date.now()}@example.com`
      const testPassword = "testPassword123"
      
      try {
        addResult("🔄 Attempting to create test user...")
        const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword)
        addResult(`✅ Test user created: ${userCredential.user.uid}`)
        
        // Test 3: Sign out and sign back in
        await auth.signOut()
        addResult("✅ Signed out successfully")
        
        await signInWithEmailAndPassword(auth, testEmail, testPassword)
        addResult("✅ Signed in successfully")
        
        // Test 4: Firestore write
        addResult("🔄 Testing Firestore write...")
        await setDoc(doc(db, "test", "testDoc"), {
          test: true,
          timestamp: new Date()
        })
        addResult("✅ Firestore write successful")
        
        // Test 5: Firestore read
        addResult("🔄 Testing Firestore read...")
        const testDoc = await getDoc(doc(db, "test", "testDoc"))
        if (testDoc.exists()) {
          addResult("✅ Firestore read successful")
        } else {
          addResult("⚠️ Document not found")
        }
        
        // Clean up
        await userCredential.user.delete()
        addResult("✅ Test user deleted")
        
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          addResult("⚠️ Test email already exists, trying sign in...")
          try {
            await signInWithEmailAndPassword(auth, testEmail, testPassword)
            addResult("✅ Signed in with existing test user")
          } catch (signInError: any) {
            addResult(`❌ Sign in failed: ${signInError.message}`)
          }
        } else if (error.code === 'auth/operation-not-allowed') {
          addResult("❌ Email/Password auth is not enabled in Firebase Console")
          addResult("👉 Go to: https://console.firebase.google.com/project/qplus-1935b/authentication/providers")
          addResult("👉 Enable Email/Password authentication")
        } else {
          addResult(`❌ Error: ${error.code || error.message}`)
        }
      }
      
      addResult("\n📊 Summary:")
      addResult(`Firebase Project: ${auth.app.options.projectId}`)
      addResult(`Auth Domain: ${auth.app.options.authDomain}`)
      addResult(`Current User: ${auth.currentUser?.email || 'None'}`)
      
    } catch (error: any) {
      addResult(`❌ Fatal error: ${error.message}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Firebase Configuration Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={testFirebase}
              disabled={testing}
              className="w-full"
            >
              {testing ? "Testing..." : "Run Firebase Tests"}
            </Button>
            
            {results.length > 0 && (
              <div className="bg-black text-white p-4 rounded-lg font-mono text-sm">
                {results.map((result, index) => (
                  <div key={index} className="mb-1">
                    {result}
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Quick Links:</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <a 
                    href="https://console.firebase.google.com/project/qplus-1935b/authentication/providers" 
                    target="_blank" 
                    className="text-blue-600 hover:underline"
                  >
                    → Enable Authentication Providers
                  </a>
                </li>
                <li>
                  <a 
                    href="https://console.firebase.google.com/project/qplus-1935b/firestore" 
                    target="_blank" 
                    className="text-blue-600 hover:underline"
                  >
                    → Check Firestore Database
                  </a>
                </li>
                <li>
                  <a 
                    href="https://console.firebase.google.com/project/qplus-1935b/firestore/rules" 
                    target="_blank" 
                    className="text-blue-600 hover:underline"
                  >
                    → Update Security Rules
                  </a>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}