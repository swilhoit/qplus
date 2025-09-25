# Q+ Library Setup Guide

## 🚀 Quick Start

1. **Copy environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project or select existing one
   - Enable Authentication (Email/Password and Google)
   - Enable Firestore Database
   - Get your config from Project Settings > General
   - Add config values to `.env.local`

3. **Set up Stripe**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com)
   - Get your API keys from Developers > API keys
   - Create products and prices:
     - Monthly subscription: $10/month
     - Annual subscription: $100/year
   - Add the price IDs to `.env.local`

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

- `/src/app` - Next.js app router pages
- `/src/contexts` - React contexts (Auth)
- `/src/lib` - Utilities (Firebase, Stripe)
- `/sanity` - Sanity CMS schemas and config

## 🔐 Authentication Flow

1. Users sign up/sign in via Firebase Auth
2. User profile created in Firestore
3. Subscription status tracked in Firestore
4. Protected routes check auth status

## 💳 Payment Flow

1. User selects plan on pricing page
2. Redirected to Stripe Checkout
3. After payment, webhook updates Firestore
4. User gains access to content

## 📊 Admin Features

Access Sanity Studio at `/studio` to:
- Add/edit content items
- Manage categories
- View user data
- Create promo codes
- Track analytics

## 🌐 Deployment

1. Set up Firebase project in production
2. Configure Stripe webhook endpoint
3. Deploy to Vercel/Netlify
4. Add production environment variables

## 📧 Email Notifications

To enable email notifications:
1. Set up SendGrid/Resend account
2. Create email templates
3. Implement webhook handlers
4. Configure triggers in Firestore

## 🔗 Important Links

- App: http://localhost:3001
- Sanity Studio: http://localhost:3001/studio
- Firebase Console: https://console.firebase.google.com
- Stripe Dashboard: https://dashboard.stripe.com