# OfficeTransform - Modern Next.js Application

A professional office transformation website built with Next.js 15 App Router, TypeScript, and modern best practices.

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **MongoDB** for database
- **Lucide React** for icons

## Project Structure

```
app/                    # Next.js App Router
├── api/               # API routes
├── globals.css        # Global styles
├── layout.tsx         # Root layout
├── page.tsx          # Home page
├── services/         # Services page
├── contact/          # Contact page
└── ...               # Other pages

src/
├── components/       # Reusable components
│   ├── layout/      # Layout components
│   └── ui/          # UI components
├── lib/             # Utilities & data
│   ├── data.ts      # Mock data with types
│   └── mongodb.ts   # Database connection
├── hooks/           # Custom React hooks
├── types/           # TypeScript types
└── utils/           # Utility functions

public/              # Static assets
├── images/          # Images
└── icons/           # Icons
```

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.local.example .env.local
# Edit MONGODB_URI in .env.local

# Start development server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build
```

## Features

- ✅ **Modern Architecture** - Next.js 15 App Router
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **API Routes** - Built-in backend functionality
- ✅ **Database Integration** - MongoDB with TypeScript
- ✅ **SEO Optimized** - Metadata API and SSR
- ✅ **Performance** - Optimized images and fonts
- ✅ **Developer Experience** - ESLint, TypeScript, hot reload

## Development

- **Development**: http://localhost:3000
- **API**: http://localhost:3000/api
- **Type checking**: `npm run type-check`
- **Linting**: `npm run lint`

## Deployment

Ready for deployment on Vercel, Netlify, or any Node.js platform with zero configuration.

## License

© 2024 OfficeTransform. All rights reserved.