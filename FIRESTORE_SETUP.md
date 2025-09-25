# Firestore Setup Required

## The Issue
Firestore is not initialized in your Firebase project yet. This is causing the 400 errors you're seeing.

## Quick Fix Steps:

### 1. Enable Firestore API
Click this link to enable the API:
https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=qplus-1935b

### 2. Create Firestore Database
1. Go to: https://console.firebase.google.com/project/qplus-1935b/firestore
2. Click **"Create database"**
3. Choose **"Start in production mode"**
4. Select location: **us-central1** (or your preferred region)
5. Click **"Enable"**

### 3. Set Security Rules
Once Firestore is created, go to the "Rules" tab and paste these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write their own user documents
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read content metadata
    match /content/{contentId} {
      allow read: if request.auth != null;
      allow write: if false; // Only through Admin SDK
    }
    
    // Allow users to manage their purchases
    match /purchases/{userId}/{purchaseId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow users to manage their subscriptions
    match /subscriptions/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false; // Only through Stripe webhooks
    }
  }
}
```

### 4. Enable Authentication
1. Go to: https://console.firebase.google.com/project/qplus-1935b/authentication
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable:
   - **Email/Password**
   - **Google** (optional)

### 5. Initialize Storage (Optional but recommended)
1. Go to: https://console.firebase.google.com/project/qplus-1935b/storage
2. Click **"Get started"**
3. Choose **"Start in production mode"**
4. Select the same location as Firestore
5. Click **"Done"**

## After Setup

Once you've completed these steps:
1. The Firestore errors will stop
2. Users will be able to sign up and sign in
3. Content access control will work properly
4. Purchase tracking will function

## Test Your Setup

1. Go to http://localhost:3000/signup
2. Create a test account
3. Check Firebase Console to see:
   - New user in Authentication
   - User document in Firestore

## Still Having Issues?

If you're still seeing errors after setup:
1. Wait 2-3 minutes for changes to propagate
2. Restart your dev server
3. Clear your browser cache
4. Check that all environment variables are set correctly in `.env.local`