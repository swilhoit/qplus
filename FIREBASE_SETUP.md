# Firebase Setup for Q+ Library

## Your Firebase Project Details
- **Project Name**: qplus
- **Project ID**: qplus-1935b
- **Project Number**: 33407996472
- **Web API Key**: AIzaSyBbfWwnfWZ9k6b8nMxrCnYJ-39a99jfk5A

## Steps to Complete Setup

### 1. Add a Web App to Your Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/project/qplus-1935b/overview)
2. Click on the "Web" icon (</>) to add a web app
3. Register the app with nickname "Q+ Library Web App"
4. Copy the Firebase configuration object
5. Update the `.env.local` file with the configuration values

### 2. Enable Authentication

1. Go to [Authentication](https://console.firebase.google.com/project/qplus-1935b/authentication)
2. Click "Get started" if not already enabled
3. Go to "Sign-in method" tab
4. Enable the following providers:
   - **Email/Password**: Click to enable
   - **Google** (optional): Click to enable and configure

### 3. Set up Firestore Database

1. Go to [Firestore Database](https://console.firebase.google.com/project/qplus-1935b/firestore)
2. Click "Create database"
3. Choose "Production mode"
4. Select your preferred location (e.g., us-central)
5. Click "Enable"

### 4. Set up Cloud Storage

1. Go to [Storage](https://console.firebase.google.com/project/qplus-1935b/storage)
2. Click "Get started"
3. Choose "Production mode"
4. Select the same location as Firestore
5. Click "Done"

### 5. Update Security Rules

After setting up Firestore, update the security rules:

```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read their own documents
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read content
    match /content/{document=**} {
      allow read: if request.auth != null;
      allow write: if false; // Only through Admin SDK
    }
    
    // Allow authenticated users to read/write their purchases
    match /purchases/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 6. Firebase Configuration

Once you've created the web app, your configuration will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBbfWwnfWZ9k6b8nMxrCnYJ-39a99jfk5A",
  authDomain: "qplus-1935b.firebaseapp.com",
  projectId: "qplus-1935b",
  storageBucket: "qplus-1935b.appspot.com",
  messagingSenderId: "33407996472",
  appId: "YOUR_APP_ID_HERE", // Get this after creating the web app
  measurementId: "YOUR_MEASUREMENT_ID" // Optional, for analytics
};
```

### 7. Update .env.local

After getting the configuration from Firebase Console, update your `.env.local` file:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBbfWwnfWZ9k6b8nMxrCnYJ-39a99jfk5A
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=qplus-1935b.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=qplus-1935b
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=qplus-1935b.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=33407996472
NEXT_PUBLIC_FIREBASE_APP_ID=[GET_FROM_CONSOLE]
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=[OPTIONAL]
```

### 8. Restart Development Server

After updating the environment variables:

```bash
# Stop the current server (Ctrl+C)
# Start it again
npm run dev
```

## Testing the Setup

1. Visit http://localhost:3000
2. Try signing up at /signup
3. Check Firebase Console > Authentication to see the new user
4. Check Firestore Database for the user document

## Troubleshooting

### Invalid API Key Error
- Make sure you've created a web app in Firebase Console
- Verify all environment variables are set correctly
- Restart the development server after changing .env.local

### Permission Denied Errors
- Check Firestore security rules
- Ensure authentication is properly configured
- Verify the user is logged in before accessing protected resources