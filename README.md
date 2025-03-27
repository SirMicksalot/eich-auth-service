# EiCh Auth Service

A lightweight authentication service that handles Google OAuth via Supabase.

## Features

- Handles Google OAuth authentication
- Redirects back to the original application
- Supports both local development and production environments

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## Usage

1. Redirect users to the auth service with a redirect URL:
```
http://localhost:5174/login?redirect=http://your-app.com
```

2. The service will:
   - Handle Google OAuth
   - Redirect back to your app at: `http://your-app.com/recent-news`

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Deployment

1. Create a new Heroku app
2. Set environment variables in Heroku:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy to Heroku:
```bash
git push heroku main
```
