/**
 * Google Ads Refresh Token Generator
 * 
 * Run this script to generate a refresh token for Google Ads API.
 * 
 * Usage:
 *   1. Make sure GOOGLE_ADS_CLIENT_ID and GOOGLE_ADS_CLIENT_SECRET are set in .env.local
 *   2. Run: node scripts/get-google-refresh-token.js
 *   3. Open the URL in your browser
 *   4. Sign in and authorize
 *   5. Copy the code from the redirect URL
 *   6. Paste it back into the terminal
 *   7. Copy the refresh token to your .env.local
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = value;
        }
      }
    });
  }
}

loadEnvFile();

const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3001/oauth/callback';
const SCOPES = ['https://www.googleapis.com/auth/adwords'];

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\n❌ Error: Missing credentials');
  console.error('   Make sure GOOGLE_ADS_CLIENT_ID and GOOGLE_ADS_CLIENT_SECRET');
  console.error('   are set in your .env.local file.\n');
  process.exit(1);
}

// Generate authorization URL
const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
authUrl.searchParams.set('client_id', CLIENT_ID);
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('scope', SCOPES.join(' '));
authUrl.searchParams.set('access_type', 'offline');
authUrl.searchParams.set('prompt', 'consent'); // Force consent to get refresh token

console.log('\n🔐 Google Ads Refresh Token Generator\n');
console.log('━'.repeat(50));
console.log('\n1. Open this URL in your browser:\n');
console.log(`   ${authUrl.toString()}\n`);
console.log('2. Sign in with the Google account that has Google Ads access');
console.log('3. Authorize the application');
console.log('4. You\'ll be redirected to a localhost URL\n');
console.log('━'.repeat(50));

// Start local server to catch the callback
const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  
  if (reqUrl.pathname === '/oauth/callback') {
    const code = reqUrl.searchParams.get('code');
    const error = reqUrl.searchParams.get('error');
    
    if (error) {
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end(`<h1>Error</h1><p>${error}</p><p>You can close this window.</p>`);
      console.error(`\n❌ Authorization error: ${error}\n`);
      server.close();
      process.exit(1);
    }
    
    if (code) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<h1>Success!</h1><p>Authorization code received. Check your terminal for the refresh token.</p><p>You can close this window.</p>');
      
      console.log('\n✅ Authorization code received! Exchanging for tokens...\n');
      
      // Exchange code for tokens
      try {
        const tokens = await exchangeCodeForTokens(code);
        
        console.log('━'.repeat(50));
        console.log('\n🎉 Success! Here\'s your refresh token:\n');
        console.log(`GOOGLE_ADS_REFRESH_TOKEN=${tokens.refresh_token}\n`);
        console.log('━'.repeat(50));
        console.log('\nAdd this to your .env.local file.\n');
        
        if (tokens.access_token) {
          console.log('Access token (for reference, expires in ~1 hour):');
          console.log(`${tokens.access_token.substring(0, 50)}...\n`);
        }
      } catch (err) {
        console.error('\n❌ Error exchanging code for tokens:', err.message);
      }
      
      server.close();
      process.exit(0);
    }
  }
  
  res.writeHead(404);
  res.end('Not found');
});

server.listen(3001, () => {
  console.log('\n⏳ Waiting for authorization (server listening on port 3001)...\n');
  console.log('   Press Ctrl+C to cancel\n');
});

// Exchange authorization code for tokens
function exchangeCodeForTokens(code) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    }).toString();
    
    const options = {
      hostname: 'oauth2.googleapis.com',
      port: 443,
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const tokens = JSON.parse(data);
          if (tokens.error) {
            reject(new Error(tokens.error_description || tokens.error));
          } else if (!tokens.refresh_token) {
            reject(new Error('No refresh token received. Make sure you used prompt=consent'));
          } else {
            resolve(tokens);
          }
        } catch (e) {
          reject(new Error('Failed to parse token response'));
        }
      });
    });
    
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\nCancelled.\n');
  server.close();
  process.exit(0);
});
