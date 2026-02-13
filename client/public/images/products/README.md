# Product Images

This folder contains all product images for the e-commerce application.

## How to Add Product Images

1. **Place your product images in this folder** - Save JPG or PNG files here
2. **Use simple, descriptive names** - e.g., `iphone-15-pro.jpg`, `wireless-headphones.jpg`
3. **Update the seed.js file** - Reference the image path as `/images/products/image-name.jpg`
4. **Update components** - Use the same path in HeroSection and product pages

## Expected Image Files

Based on the current products, you should add these images:

### Mobiles
- `iphone-15-pro.jpg`

### Accessories
- `wireless-headphones.jpg`
- `smart-watch.jpg`
- `usb-charger.jpg`
- `portable-ssd.jpg`
- `mechanical-keyboard.jpg`
- `webcam.jpg`
- `desk-lamp.jpg`

### Phone Covers
- `phone-stand.jpg`
- `screen-protector.jpg`
- `phone-case.jpg`

### TV
- `oled-tv.jpg`

### Hero Carousel
- `laptop.jpg`
- `flagship-phone.jpg`
- `smartwatch.jpg`
- `wireless-earbuds.jpg`

## Image Specifications

- **Format**: JPG or PNG (JPG recommended for smaller file size)
- **Resolution**: Minimum 500x500px (recommended 800x800px or higher)
- **Size**: Keep file size under 500KB for optimal loading
- **Aspect Ratio**: Square (1:1) or slightly rectangular works best

## Fallback Behavior

If an image is not found, there's a fallback in the code that displays a placeholder. To view missing images, check the browser console for 404 errors.

## Example Usage in Code

```javascript
{
  name: 'Product Name',
  price: 9999,
  category: 'Category',
  brand: 'Brand',
  description: 'Description',
  image: '/images/products/product-name.jpg'  // Use this format
}
```
