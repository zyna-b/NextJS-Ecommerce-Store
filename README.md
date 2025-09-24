# 🛍️ NextJS E-commerce Store

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, full-featured e-commerce store built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This project showcases a complete online shopping experience with user authentication, shopping cart functionality, product reviews, and a responsive design.

## ✨ Features

### 🔥 Core E-commerce Features
- **Product Catalog** - Browse products by categories with detailed product pages
- **Shopping Cart** - Add, remove, and manage items with persistent cart state
- **User Authentication** - Secure sign-in/sign-up with Clerk integration
- **Product Reviews & Ratings** - Customer reviews with 5-star rating system
- **Search & Filter** - Find products by category, size, and color
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### 🚀 Technical Features
- **Server-Side Rendering (SSR)** - Fast page loads and SEO optimization
- **Static Site Generation (SSG)** - Pre-rendered pages for better performance
- **Image Optimization** - Cloudinary integration for responsive images
- **State Management** - Zustand for efficient client-side state
- **Type Safety** - Full TypeScript implementation
- **Modern UI** - Beautiful components with Tailwind CSS and custom theming

### 🛡️ Security & Performance
- **Protected Routes** - Middleware-based route protection
- **Form Validation** - Client and server-side validation
- **Error Handling** - Comprehensive error boundaries and toast notifications
- **SEO Optimized** - Meta tags, structured data, and semantic HTML

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | Tailwind CSS, Lucide Icons |
| **Authentication** | Clerk |
| **State Management** | Zustand |
| **Image Hosting** | Cloudinary |
| **HTTP Client** | Axios |
| **Notifications** | React Hot Toast |
| **Development** | ESLint, PostCSS, Turbopack |

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (Node.js 22+ recommended for optimal performance)
- **npm**, **yarn**, **pnpm**, or **bun**
- A **Clerk** account for authentication
- A **Cloudinary** account for image hosting

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/zyna-b/NextJS-Ecommerce-Store.git
cd NextJS-Ecommerce-Store
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Cloudinary (for image hosting)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Billboard ID (for homepage banner)
BILLBOARD_ID=your_billboard_id

# API Base URL
NEXT_PUBLIC_API_URL=your_api_base_url
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📁 Project Structure

```
NextJS-Ecommerce-Store/
├── app/                    # Next.js 15 App Router
│   ├── (routes)/          # Route groups
│   │   ├── cart/          # Shopping cart page
│   │   ├── category/      # Category pages
│   │   ├── product/       # Product detail pages
│   │   └── page.tsx       # Homepage
│   ├── api/               # API routes
│   │   └── reviews/       # Review endpoints
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── gallery/          # Product image gallery
│   ├── navbar.tsx        # Navigation bar
│   └── footer.tsx        # Footer component
├── hooks/                # Custom React hooks
├── actions/              # Server actions
├── providers/            # Context providers
├── types.ts              # TypeScript type definitions
└── public/               # Static assets
```

## 🎨 Customization

### Theming

The project uses a custom Tailwind CSS theme with fashion-focused colors:

```javascript
// tailwind.config.ts
colors: {
  fashion: {
    primary: '#7c3aed',   // Elegant purple
    accent: '#f3f4f6',    // Soft background
    dark: '#222',         // Dark text
    light: '#f8fafc',     // Light background
  },
}
```

### Adding New Features

1. **New Components** - Add to `/components` directory
2. **New Pages** - Create in `/app/(routes)` directory
3. **API Routes** - Add to `/app/api` directory
4. **Types** - Define in `types.ts`

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build production application |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

## 🚀 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy with one click

### Other Deployment Options

- **Netlify** - Connect your Git repository
- **Railway** - Deploy with Docker support  
- **AWS Amplify** - Serverless deployment
- **DigitalOcean App Platform** - Container-based deployment

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for detailed instructions.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the existing code style.

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. **GitHub Issues** - [Create an issue](https://github.com/zyna-b/NextJS-Ecommerce-Store/issues)
2. **Discussions** - [Join the discussion](https://github.com/zyna-b/NextJS-Ecommerce-Store/discussions)

## 🌟 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For hosting and deployment platform
- **Clerk** - For authentication services
- **Tailwind CSS** - For utility-first CSS framework
- **Cloudinary** - For image optimization services
  
---

Built with ❤️ using **Next.js** and **TypeScript**

**Keywords:** nextjs, ecommerce, typescript, tailwindcss, clerk, shopping-cart, product-reviews, responsive-design, full-stack, modern-web-development
