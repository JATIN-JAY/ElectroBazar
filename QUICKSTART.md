# Quick Start Guide

## One-Time Setup

### 1. Make sure MongoDB is running
```bash
# On Windows with MongoDB installed:
mongod

# Or use MongoDB Atlas (cloud):
# https://www.mongodb.com/cloud/atlas
```

### 2. Terminal 1 - Backend Setup & Start
```bash
cd server
npm install
node seed.js          # Insert sample products
npm start             # Start backend on port 5000
```

### 3. Terminal 2 - Frontend Setup & Start
```bash
cd client
npm install
npm run dev           # Start frontend on port 3000
```

## Access the App

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## Test the Features

### 1. Register & Login
- Click "Sign up" in the navbar
- Create an account with any email/password
- Login with your credentials
- Your name should appear in the navbar

### 2. Browse Products
- You should see 12 sample products on the homepage
- Hover over products to see "Add to Cart" button
- The cart badge shows number of items

### 3. Add to Cart
- Click "Add to Cart" on any product
- See the cart badge update
- Click the cart icon to view cart

### 4. Checkout
- In the cart, enter shipping info
- Click "Place Order"
- Order should be saved in MongoDB

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key_here_change_in_production
```

### MongoDB Connection Options
```
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/ecommerce

# MongoDB Atlas (cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
```

## Troubleshooting

### "Cannot GET /api/products"
- Backend not running
- Frontend proxy not working
- Start backend on port 5000

### MongoDB Connection Error
- MongoDB not running
- Wrong connection string in .env
- Check MongoDB service status

### "Module not found"
- Run `npm install` in both server and client folders
- Delete node_modules and try again

### Styles not showing
- Tailwind CSS not compiled
- Restart dev server: `npm run dev`

## Next Steps

1. **Customize styling** - Edit `tailwind.config.js` and `src/index.css`
2. **Add more products** - Edit `server/seed.js` and run it again
3. **Customize branding** - Change logo, colors, and text
4. **Deploy** - Use Vercel (frontend) and Heroku/Railway (backend)

---

Happy coding! 🚀
