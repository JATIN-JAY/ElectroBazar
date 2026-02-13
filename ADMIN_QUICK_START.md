# PhoneHub Admin Dashboard - Quick Start

## What's Been Set Up

✅ **Backend**
- Express API endpoints for product CRUD operations
- Cloudinary integration for image uploads
- Admin authentication middleware
- User model with `isAdmin` field
- Product creation/update/delete endpoints (admin-only)

✅ **Frontend** 
- AdminDashboard page (route: `/admin`)
- ProductForm component with Cloudinary image upload
- Admin link in navbar (visible only to admins)
- Full product management table

✅ **Database**
- MongoDB collection ready for products
- User schema updated with `isAdmin` field
- Product schema supports all categories: Mobiles, Tablets, Earbuds, Headsets, Accessories

## Quick Setup (3 Steps)

### Step 1: Get Cloudinary Free Account
Visit https://cloudinary.com and sign up for free account

### Step 2: Configure Environment
1. Get your Cloud Name, API Key, and API Secret from Cloudinary
2. Update `/server/.env`:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key  
CLOUDINARY_API_SECRET=your_api_secret
```

3. In `/client/src/components/ProductForm.jsx`, update this line (line ~55):
```javascript
`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload` // Replace YOUR_CLOUD_NAME
```

### Step 3: Create Upload Preset in Cloudinary
1. Go to Settings → Upload in Cloudinary dashboard
2. Add unsigned upload preset named: `phonehub_unsigned`
3. Set "Unsigned" to ON

### Step 4: Create Admin Account
```bash
cd server
node create-admin.js
```
This creates: `admin@phonehub.com` / `admin123`

### Step 5: Login & Access Admin Panel
1. Login with admin credentials
2. Click "Admin" button in navbar
3. Start adding products!

## File Structure

```
server/
├── routes/
│   └── products.js          (✨ NEW: POST/PUT/DELETE endpoints)
├── middleware/
│   └── auth.js              (✨ NEW: checkAdmin middleware)
├── models/
│   ├── User.js              (✨ UPDATED: added isAdmin field)
│   └── Product.js           (✨ UPDATED: category enum updated)
├── create-admin.js          (✨ NEW: admin setup script)
└── .env                      (✨ UPDATED: Cloudinary config)

client/src/
├── pages/
│   └── AdminDashboard.jsx   (✨ NEW: admin panel page)
├── components/
│   ├── ProductForm.jsx      (✨ NEW: product creation form)
│   └── Navbar.jsx           (✨ UPDATED: admin link added)
└── App.jsx                  (✨ UPDATED: /admin route added)

ADMIN_SETUP.md              (✨ NEW: detailed setup guide)
```

## Features

### Product Management
- ✅ Add products with image upload
- ✅ Auto-select brands based on category
- ✅ Image preview before upload
- ✅ Real-time validation
- ✅ Product list with thumbnails
- ✅ Delete products
- ✅ (TODO) Edit existing products

### Image Upload
- ✅ Drag & drop support
- ✅ File size validation
- ✅ Image preview
- ✅ Cloudinary integration
- ✅ Secure unsigned uploads

### Security
- ✅ JWT authentication
- ✅ Admin-only endpoints
- ✅ Middleware validation
- ✅ Error handling

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | No | Get all products |
| GET | `/api/products/:id` | No | Get single product |
| POST | `/api/products` | ✓ Admin | Create product |
| PUT | `/api/products/:id` | ✓ Admin | Update product |
| DELETE | `/api/products/:id` | ✓ Admin | Delete product |

## Troubleshooting

### Image upload fails
→ Check Cloudinary preset is set to "Unsigned"
→ Verify cloud name in ProductForm.jsx matches your account
→ Check browser console for detailed error

### Admin button doesn't appear
→ Confirm user has `isAdmin: true` in database
→ Check you're logged in and page is refreshed
→ Verify localStorage contains `isAdmin` field

### Products don't save
→ Check backend is running on port 5000
→ Verify JWT token is valid
→ Check MongoDB connection string in .env

See `ADMIN_SETUP.md` for detailed troubleshooting

## Next Features to Add

- [ ] Edit product functionality
- [ ] Bulk import from CSV
- [ ] Product search/filters in admin
- [ ] Sales analytics dashboard
- [ ] Inventory management
- [ ] Multiple admin accounts
- [ ] Activity logging
- [ ] Image optimization via Cloudinary

## Need Help?

1. Check `ADMIN_SETUP.md` for detailed guide
2. Review error messages in browser console
3. Check backend logs in terminal
4. Verify all environment variables are set

---

Admin Dashboard is ready! 🚀 Start adding products now!
