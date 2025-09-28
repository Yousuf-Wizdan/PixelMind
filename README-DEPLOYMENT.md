# Deployment Guide for PixelMind on Vercel

## Prerequisites

1. **Database**: Set up a PostgreSQL database (recommended: Neon, Supabase, or PlanetScale)
2. **Google OAuth**: Create a project in Google Cloud Console and get OAuth credentials
3. **Polar Account**: Set up Polar for payments
4. **ImageKit Account**: Set up ImageKit for image handling

## Environment Variables

Set up the following environment variables in your Vercel dashboard:

### Database
- `DATABASE_URL`: Your PostgreSQL connection string

### Authentication
- `BETTER_AUTH_SECRET`: A random secret key (generate with `openssl rand -base64 32`)
- `BETTER_AUTH_URL`: Your production URL (e.g., `https://your-app.vercel.app`)

### OAuth
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret

### Polar (Payments)
- `POLAR_ACCESS_TOKEN`: Your Polar access token
- `POLAR_WEBHOOK_SECRET`: Your Polar webhook secret

### ImageKit
- `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`: Your ImageKit public key
- `IMAGEKIT_PRIVATE_KEY`: Your ImageKit private key
- `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`: Your ImageKit URL endpoint

## Deployment Steps

1. **Push to GitHub**: Make sure your code is pushed to a GitHub repository

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Set Environment Variables**:
   - In Vercel dashboard, go to Project Settings > Environment Variables
   - Add all the environment variables listed above

4. **Deploy**:
   - Vercel will automatically deploy on every push to main branch
   - Your app will be available at `https://your-project-name.vercel.app`

5. **Database Migration**:
   - After deployment, you may need to run database migrations
   - You can do this locally with: `npx prisma db push`
   - Or set up a separate migration process

## Important Notes

- The `postinstall` script will automatically generate Prisma client during build
- Prisma client is generated in `/src/generated/prisma` (make sure this is in .gitignore)
- The middleware will redirect unauthenticated users to `/auth/sign-in`
- Make sure your Google OAuth settings include your production domain

## Troubleshooting

### Build Errors
- Check if all environment variables are set correctly
- Ensure database is accessible from Vercel
- Check the build logs in Vercel dashboard

### Runtime Errors
- Check function logs in Vercel dashboard
- Ensure all API endpoints are working
- Verify database connections

### Authentication Issues
- Make sure `BETTER_AUTH_URL` matches your production domain
- Check Google OAuth settings include your domain
- Verify all auth-related environment variables are set