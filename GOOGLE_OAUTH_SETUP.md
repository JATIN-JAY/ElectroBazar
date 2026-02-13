# Google OAuth Setup Guide

## Overview
Google Sign-In has been integrated into both the **Login** and **Sign Up** pages of ElectroBazaar. Users can now authenticate using their Google accounts.

## Setup Instructions

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Choose **Web application**
6. Add authorized JavaScript origins:
   - `http://localhost:5173` (development)
   - `http://localhost:3000` (if using different port)
   - Your production domain
7. Add authorized redirect URIs:
   - `http://localhost:5173` (development)
   - Your production domain
8. Copy the **Client ID** (it looks like: `xxxxx.apps.googleusercontent.com`)

### Step 2: Update Environment Variables

#### Client-side (.env.local in `client/` folder):
```
VITE_CLOUDINARY_CLOUD_NAME=dvtw2ocwg
VITE_CLOUDINARY_UPLOAD_PRESET=phonehub_unsigned
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

Replace `your_google_client_id_here` with your actual Google Client ID.

#### Server-side (.env in `server/` folder):
```
GOOGLE_CLIENT_ID=your_google_client_id_here
```

Replace `your_google_client_id_here` with the same Google Client ID.

### Step 3: Features Implemented

✅ **Google Sign-In on Login Page**
- Automatic account creation if user doesn't exist
- Automatic login if user already exists
- One-Tap sign-in enabled

✅ **Google Sign-In on Sign Up Page**
- Automatic account creation
- Login if account already exists
- One-Tap sign-in enabled

✅ **User Data Captured**
- Name
- Email
- Profile picture (stored as `profileImage`)

### Step 4: Technical Details

**Frontend Libraries:**
- `@react-oauth/google` - Google OAuth library for React

**Backend:**
- `google-auth-library` - For verifying Google JWT tokens

**API Endpoints:**
- `POST /api/auth/google-login` - Handle Google login
- `POST /api/auth/google-register` - Handle Google registration

### Step 5: Testing

1. Start the development server:
   ```bash
   # Terminal 1: Server
   cd server
   npm start

   # Terminal 2: Client
   cd client
   npm run dev
   ```

2. Navigate to `/login` or `/register`
3. Click the Google button
4. Test with your Google account

### Step 6: Production Considerations

1. Update `VITE_GOOGLE_CLIENT_ID` in production environment variables
2. Update `GOOGLE_CLIENT_ID` in server production environment variables
3. Add your production domain to Google OAuth authorized origins
4. Use HTTPS in production

## Troubleshooting

### "Invalid Client ID" Error
- Verify the Client ID is copied correctly from Google Cloud Console
- Ensure Client ID is added to both client and server .env files
- Check that your domain is authorized in Google OAuth settings

### One-Tap Sign-In Not Showing
- One-Tap may not show if:
  - User is already signed in to their Google account elsewhere
  - Browser doesn't support it (use standard button instead)
  - Domain not authorized in Google OAuth settings

### Token Verification Fails
- Ensure `GOOGLE_CLIENT_ID` in server .env matches the one in client
- Check that Google API is enabled in your Google Cloud project

## Security Notes

- Never expose your Google Client Secret in frontend code
- Only Client ID is needed for frontend (it's public)
- Server-side token verification ensures security
- JWT tokens are generated server-side after verification

## Reference

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Docs](https://www.npmjs.com/package/@react-oauth/google)
- [Google Auth Library](https://www.npmjs.com/package/google-auth-library)
