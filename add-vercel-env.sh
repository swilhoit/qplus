#!/bin/bash

# Add all environment variables to Vercel for production, preview, and development

echo "Adding environment variables to Vercel..."

# Firebase Configuration
echo "AIzaSyBbfWwnfWZ9k6b8nMxrCnYJ-39a99jfk5A" | npx vercel env add NEXT_PUBLIC_FIREBASE_API_KEY preview --force
echo "AIzaSyBbfWwnfWZ9k6b8nMxrCnYJ-39a99jfk5A" | npx vercel env add NEXT_PUBLIC_FIREBASE_API_KEY development --force

echo "qplus-1935b.firebaseapp.com" | npx vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production --force
echo "qplus-1935b.firebaseapp.com" | npx vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN preview --force
echo "qplus-1935b.firebaseapp.com" | npx vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN development --force

echo "qplus-1935b" | npx vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production --force
echo "qplus-1935b" | npx vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID preview --force
echo "qplus-1935b" | npx vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID development --force

echo "qplus-1935b.firebasestorage.app" | npx vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production --force
echo "qplus-1935b.firebasestorage.app" | npx vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET preview --force
echo "qplus-1935b.firebasestorage.app" | npx vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET development --force

echo "33407996472" | npx vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production --force
echo "33407996472" | npx vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID preview --force
echo "33407996472" | npx vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID development --force

echo "1:33407996472:web:842f5d1e098132527c4ccd" | npx vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production --force
echo "1:33407996472:web:842f5d1e098132527c4ccd" | npx vercel env add NEXT_PUBLIC_FIREBASE_APP_ID preview --force
echo "1:33407996472:web:842f5d1e098132527c4ccd" | npx vercel env add NEXT_PUBLIC_FIREBASE_APP_ID development --force

# Firebase Admin SDK
echo "qplus-1935b" | npx vercel env add FIREBASE_ADMIN_PROJECT_ID production --force
echo "qplus-1935b" | npx vercel env add FIREBASE_ADMIN_PROJECT_ID preview --force
echo "qplus-1935b" | npx vercel env add FIREBASE_ADMIN_PROJECT_ID development --force

echo "firebase-adminsdk-fbsvc@qplus-1935b.iam.gserviceaccount.com" | npx vercel env add FIREBASE_ADMIN_CLIENT_EMAIL production --force
echo "firebase-adminsdk-fbsvc@qplus-1935b.iam.gserviceaccount.com" | npx vercel env add FIREBASE_ADMIN_CLIENT_EMAIL preview --force
echo "firebase-adminsdk-fbsvc@qplus-1935b.iam.gserviceaccount.com" | npx vercel env add FIREBASE_ADMIN_CLIENT_EMAIL development --force

# Note: FIREBASE_ADMIN_PRIVATE_KEY needs to be added manually due to multiline format

# Stripe Configuration
echo "pk_test_51234567890" | npx vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production --force
echo "pk_test_51234567890" | npx vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY preview --force
echo "pk_test_51234567890" | npx vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY development --force

echo "sk_test_51234567890" | npx vercel env add STRIPE_SECRET_KEY production --force
echo "sk_test_51234567890" | npx vercel env add STRIPE_SECRET_KEY preview --force
echo "sk_test_51234567890" | npx vercel env add STRIPE_SECRET_KEY development --force

echo "whsec_1234567890" | npx vercel env add STRIPE_WEBHOOK_SECRET production --force
echo "whsec_1234567890" | npx vercel env add STRIPE_WEBHOOK_SECRET preview --force
echo "whsec_1234567890" | npx vercel env add STRIPE_WEBHOOK_SECRET development --force

# Stripe Price IDs
echo "price_monthly_id" | npx vercel env add STRIPE_PRICE_MONTHLY production --force
echo "price_monthly_id" | npx vercel env add STRIPE_PRICE_MONTHLY preview --force
echo "price_monthly_id" | npx vercel env add STRIPE_PRICE_MONTHLY development --force

echo "price_annual_id" | npx vercel env add STRIPE_PRICE_ANNUAL production --force
echo "price_annual_id" | npx vercel env add STRIPE_PRICE_ANNUAL preview --force
echo "price_annual_id" | npx vercel env add STRIPE_PRICE_ANNUAL development --force

# App Configuration
echo "https://qplus.vercel.app" | npx vercel env add NEXT_PUBLIC_APP_URL production --force
echo "https://qplus.vercel.app" | npx vercel env add NEXT_PUBLIC_APP_URL preview --force
echo "http://localhost:3000" | npx vercel env add NEXT_PUBLIC_APP_URL development --force

# Sanity Configuration
echo "duoy0d82" | npx vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production --force
echo "duoy0d82" | npx vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID preview --force
echo "duoy0d82" | npx vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID development --force

echo "production" | npx vercel env add NEXT_PUBLIC_SANITY_DATASET production --force
echo "production" | npx vercel env add NEXT_PUBLIC_SANITY_DATASET preview --force
echo "production" | npx vercel env add NEXT_PUBLIC_SANITY_DATASET development --force

echo "sknGopXI9V6fT0fO3At2jFMz4xtFIMAaeCiQvsL5hM9eLfNVaHbsMiraEWaWvfj3jfoK0Canc32mjxfxo3uho6u36ZyWjhuAgqm8NxriRQE2yBMEWxPYsogTECsDkH6P0YNOKzLMM7hPDxcmaH59i9Q8jBlFeUdGkNYHWzXFF7u4nrcSEyua" | npx vercel env add SANITY_API_TOKEN production --force
echo "sknGopXI9V6fT0fO3At2jFMz4xtFIMAaeCiQvsL5hM9eLfNVaHbsMiraEWaWvfj3jfoK0Canc32mjxfxo3uho6u36ZyWjhuAgqm8NxriRQE2yBMEWxPYsogTECsDkH6P0YNOKzLMM7hPDxcmaH59i9Q8jBlFeUdGkNYHWzXFF7u4nrcSEyua" | npx vercel env add SANITY_API_TOKEN preview --force
echo "sknGopXI9V6fT0fO3At2jFMz4xtFIMAaeCiQvsL5hM9eLfNVaHbsMiraEWaWvfj3jfoK0Canc32mjxfxo3uho6u36ZyWjhuAgqm8NxriRQE2yBMEWxPYsogTECsDkH6P0YNOKzLMM7hPDxcmaH59i9Q8jBlFeUdGkNYHWzXFF7u4nrcSEyua" | npx vercel env add SANITY_API_TOKEN development --force

# NextAuth Configuration
echo "https://qplus.vercel.app" | npx vercel env add NEXTAUTH_URL production --force
echo "https://qplus.vercel.app" | npx vercel env add NEXTAUTH_URL preview --force
echo "http://localhost:3000" | npx vercel env add NEXTAUTH_URL development --force

echo "generate-a-random-secret-here" | npx vercel env add NEXTAUTH_SECRET production --force
echo "generate-a-random-secret-here" | npx vercel env add NEXTAUTH_SECRET preview --force
echo "generate-a-random-secret-here" | npx vercel env add NEXTAUTH_SECRET development --force

echo "Done adding environment variables!"