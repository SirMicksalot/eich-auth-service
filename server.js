const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes - more permissive for debugging
app.use((req, res, next) => {
  // Log origin for debugging
  console.log('Request from origin:', req.headers.origin);
  
  const origin = req.headers.origin;
  
  // Allow origin if it exists
  if (origin) {
    // For debugging, we're allowing all origins temporarily
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  }
  
  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  
  next();
});

// Removing the additional cors middleware that was causing conflicts

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle Supabase authentication callback routes
app.get('/code-*', (req, res) => {
  // Special handling for Supabase auth callback URLs
  // These URLs are used when redirecting back from Supabase auth flows
  // like magic links, OAuth providers, etc.
  console.log('Auth callback received:', req.path);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'favicon.ico'));
});

// Handle client-side routing by serving index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});