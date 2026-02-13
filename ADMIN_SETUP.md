# Admin Dashboard Setup Guide

## Overview
This guide will help you set up the admin dashboard with Cloudinary image uploads for the PhoneHub e-commerce platform.

## Prerequisites
- Node.js and npm installed
- Both server and client running
- A Cloudinary account (free or paid)

## Step 1: Set Up Cloudinary Account

1. Go to [https://cloudinary.com](https://cloudinary.com) and create a free account
2. Once logged in, go to your Dashboard
3. Copy your:
   - **Cloud Name** (found at the top of dashboard)
   - **API Key** (found in Account Settings → API Keys)
   - **API Secret** (found in Account Settings → API Keys)

## Step 2: Create Unsigned Upload Preset

1. In your Cloudinary Dashboard, go to **Settings** (gear icon) → **Upload**
2. Scroll down to **Upload presets** section
3. Click **Add upload preset**
4. Set:
   - **Name**: `phonehub_unsigned`
   - **Unsigned**: Toggle ON (this allows uploads without authentication from frontend)
   - **Folder**: `phonehub/products` (optional, helps organize uploads)
5. Click **Save**

## Step 3: Configure Server Environment Variables

Edit `/server/.env` and update:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
ADMIN_EMAIL=admin@phonehub.com
```

## Step 4: Configure Client

The client is preconfigured with the unsigned upload endpoint. The upload preset `phonehub_unsigned` and cloud name `dh5pwbwjf` is hardcoded in `ProductForm.jsx`. You may need to update it:

In `/client/src/components/ProductForm.jsx`, replace:
```javascript
const uploadResponse = await axios.post(
  `https://api.cloudinary.com/v1_1/dh5pwbwjf/image/upload`, // Replace dh5pwbwjf with your cloud name
  {
    file: base64String,
    upload_preset: 'phonehub_unsigned', // Use your preset name
  }
);
```

## Step 5: Create Admin User

You have two options:

### Option A: Direct MongoDB Update
1. Connect to your MongoDB cluster
2. In the `users` collection, find your user document
3. Add/update the field: `"isAdmin": true`

### Option B: Manual Database Script
Create `/server/create-admin.js`:
```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const adminEmail = 'admin@phonehub.com';
    const adminPassword = 'admin123'; // Change this!
    
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      existingAdmin.isAdmin = true;
      await existingAdmin.save();
      console.log('Admin privileges granted to existing user');
    } else {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const admin = new User({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true,
      });
      await admin.save();
      console.log('Admin user created successfully');
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
```

Then run:
```bash
cd server
node create-admin.js
```

## Step 6: Access Admin Dashboard

1. Start both server and client:
   ```bash
   # Terminal 1 - Server
   cd server
   npm start
   
   # Terminal 2 - Client
   cd client
   npm run dev
   ```

2. Login with admin credentials:
   - **Email**: `admin@phonehub.com`
   - **Password**: Your chosen password (default: `admin123`)

3. You should see an **Admin** button in the navbar (blue gradient)

4. Click **Admin** to access the dashboard at `/admin`

## Step 7: Add Your First Product

1. Fill in all form fields:
   - **Product Name**: e.g., "iPhone 15 Pro Max"
   - **Price**: e.g., 149999
   - **Category**: Select from Mobiles, Tablets, Earbuds, Headsets, Accessories
   - **Brand**: Auto-populated based on category
   - **Description**: Detailed product description
   - **Product Image**: Click "Choose Image" to upload

2. Click **Create Product** button

3. Image will upload to Cloudinary (visible in progress indicator)

4. Once successful, product appears in the Products List table below

## API Endpoints

### Create Product
**POST** `/api/products`
- Headers: `Authorization: Bearer {token}`
- Body:
```json
{
  "name": "Product Name",
  "price": 49999,
  "category": "Mobiles",
  "brand": "Apple",
  "description": "Product description",
  "imageUrl": "https://res.cloudinary.com/..."
}
```

### Get All Products
**GET** `/api/products`

### Get Single Product
**GET** `/api/products/:id`

### Update Product
**PUT** `/api/products/:id`
- Headers: `Authorization: Bearer {token}`
- Body: Same as Create Product

### Delete Product
**DELETE** `/api/products/:id`
- Headers: `Authorization: Bearer {token}`

## Troubleshooting

### "Image upload failed"
- Check that unsigned upload preset `phonehub_unsigned` is created
- Verify cloud name in ProductForm.jsx matches your Cloudinary account
- Ensure "Unsigned" is enabled in the upload preset settings

### "Access denied. Admin only"
- Make sure logged-in user has `isAdmin: true` in database
- Check that token is being sent with header: `Authorization: Bearer {token}`

### Product not appearing
- Check browser console for errors
- Verify backend server is running on port 5000
- Check MongoDB connection in `.env` file

### Image not displaying
- Verify image URL is correct (starts with https://res.cloudinary.com/)
- Check Cloudinary upload preset settings
- Ensure file upload completed before submitting form

## Security Notes

⚠️ **Important**: Never commit `.env` file to version control!

- Change default admin password immediately
- Use environment variables for all sensitive data
- In production, implement proper authentication and CSRF protection
- Consider adding role-based access control for multiple admins
- Regularly audit Cloudinary uploads for unauthorized content

## Next Steps

- Add product edit functionality
- Implement product search/filter in admin dashboard
- Add bulk product import from CSV
- Set up automated image optimization
- Add product analytics
- Implement admin activity logging

---

For more help, check the Cloudinary docs: [https://cloudinary.com/documentation](https://cloudinary.com/documentation)
