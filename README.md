# My Online Store

![App Preview](https://imgix.cosmicjs.com/6c77a1f0-4eb6-11f1-8004-49554e815733-autopilot-photo-1548036328-c9fa89d128fa-1778668083592.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern e-commerce storefront built with Next.js 16 and Cosmic CMS.

## Features

- 🛍️ Browse products by category
- 🎨 View product variants (size, color, pricing)
- ⭐ Customer reviews with star ratings
- 📦 Inventory status tracking
- 💰 Sale price display
- 🖼️ Optimized product imagery
- 📱 Fully responsive design

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a0451d1b4bc78a77bbd97ce&clone_repository=6a0452cfb4bc78a77bbd9814)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews"

### Code Generation Prompt

> Build a Next.js application for an online business called "My Online Store". The content is managed in Cosmic CMS with the following object types: categories, products, variants, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **Cosmic SDK** - Official Cosmic JavaScript SDK

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with bucket configured

### Installation

```bash
bun install
```

Set up environment variables in `.env.local`:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Run the development server:

```bash
bun run dev
```

## Cosmic SDK Examples

### Fetching Products

```typescript
const response = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product

```typescript
const response = await cosmic.objects
  .findOne({ type: 'products', slug: 'product-slug' })
  .depth(1)
```

### Fetching Reviews for a Product

```typescript
const response = await cosmic.objects
  .find({ type: 'reviews', 'metadata.product': productId })
  .depth(1)
```

## Cosmic CMS Integration

This app integrates with four Cosmic object types:

- **Categories**: Product taxonomy with images
- **Products**: Full catalog with pricing and inventory
- **Variants**: Product variations (size, color, etc.)
- **Reviews**: Customer feedback with ratings

## Deployment Options

### Vercel
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Netlify
1. Connect repository
2. Build command: `bun run build`
3. Add environment variables
4. Deploy

<!-- README_END -->