# OfficeTransform - Next.js Application

Modern office transformation website built with Next.js 15, TypeScript, and Prisma.

## Tech Stack

- **Next.js 15** with App Router
- **Prisma** with MySQL
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Zod** for validation

## Quick Start

```bash
# Install dependencies
npm install

# Set up database
npx prisma generate
npx prisma db push

# Start development
npm run dev
```

## Project Structure

```
app/                 # Next.js App Router
├── api/            # API routes
├── (pages)/        # Page components
└── globals.css     # Global styles

src/
├── components/     # Reusable components
├── lib/           # Data and utilities
├── models/        # Prisma models
├── controllers/   # Business logic
├── services/      # External services
└── validators/    # Input validation

prisma/
└── schema.prisma  # Database schema
```

## Environment Variables

```bash
DATABASE_URL="mysql://user:password@localhost:3306/office_transform"
```

## Development

- **Dev server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`

## License

© 2024 OfficeTransform. All rights reserved.