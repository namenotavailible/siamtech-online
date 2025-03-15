
/**
 * Security Configuration Documentation
 * 
 * This file contains documentation for implementing the complete security 
 * enhancements as requested, including NGINX/server configurations, DNS settings,
 * and other security measures that need to be applied at different levels.
 * 
 * Note: The actual implementation of these settings should be done at the server,
 * DNS, and infrastructure level - not within the application code.
 */

// For illustration purposes only - these are configurations to be applied externally
export const nginxSecurityConfig = `
# NGINX Security Configuration Example
# Apply these settings in your NGINX server blocks

# Hide NGINX version
server_tokens off;

# SSL Configuration
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers on;
ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384';
ssl_session_timeout 1d;
ssl_session_cache shared:SSL:10m;
ssl_session_tickets off;

# OCSP Stapling
ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;

# HSTS Configuration
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

# Content Security Policy
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://trusted-cdn.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://zeullrjvxxdweldihwbq.supabase.co wss:; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';" always;

# Additional Security Headers
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name siamtechonline.com www.siamtechonline.com;
    return 301 https://$host$request_uri;
}

# Rate limiting for critical endpoints
limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
limit_req_zone $binary_remote_addr zone=api:10m rate=30r/m;

location /login {
    limit_req zone=login burst=10 nodelay;
    # additional configuration...
}

location /api {
    limit_req zone=api burst=20 nodelay;
    # additional configuration...
}
`;

// DNS CAA Record configuration
export const dnsConfiguration = `
# DNS CAA Record Example
# Add this to your DNS zone file or through your DNS provider:
siamtechonline.com. CAA 0 issue "letsencrypt.org"
`;

// Cloudflare WAF configuration example
export const cloudflareWafConfig = `
# Cloudflare WAF Configuration Recommendations
1. Enable "Bot Fight Mode" to stop automated threats
2. Enable "Challenge Passage" to reduce impact on legitimate users
3. Enable "Zone Lockdown" to restrict access to sensitive endpoints by IP
4. Configure WAF Managed Rules to protect against SQL injection, XSS, etc.
5. Set up Rate Limiting for API endpoints
6. Enable "Browser Integrity Check" to block malicious requests
`;

// Cookie security settings
export const secureCookieSettings = {
  secure: true,       // Only sent over HTTPS
  httpOnly: true,     // Not accessible via JavaScript
  sameSite: 'Strict', // Only sent for same-site requests
  maxAge: 3600,       // Cookie expiration in seconds
};

// JWT security best practices
export const jwtSecurityPractices = {
  algorithm: 'RS256',           // Asymmetric algorithm
  expiresIn: '1h',              // Short-lived tokens
  audience: 'siamtechonline.com', // Intended recipient
  issuer: 'auth.siamtechonline.com', // Token issuer
  includeJwtId: true,           // Include unique ID
};

/**
 * Function to set secure cookies with proper attributes
 * Use this on the client side when setting cookies
 */
export const setSecureCookie = (name: string, value: string, options = {}) => {
  const defaultOptions = {
    secure: true,
    httpOnly: true,
    sameSite: 'Strict',
    path: '/',
    maxAge: 3600
  };
  
  const cookieOptions = { ...defaultOptions, ...options };
  const cookieString = Object.entries(cookieOptions)
    .reduce((acc, [key, value]) => {
      if (typeof value === 'boolean' && value) {
        return `${acc}; ${key}`;
      }
      return `${acc}; ${key}=${value}`;
    }, `${name}=${value}`);
    
  document.cookie = cookieString;
};

/**
 * Function to get Helmet security headers for React components
 * This provides consistent security headers across all pages
 */
export const getSecurityHeaders = () => {
  return {
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer-when-downgrade",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()"
  };
};

/**
 * Implementation Checklist for Security Enhancements
 */
export const securityChecklist = [
  { task: 'Configure SSL with OCSP stapling', level: 'Server', done: false },
  { task: 'Implement HSTS with preload', level: 'Server', done: false },
  { task: 'Submit domain to HSTS preload list', level: 'DNS', done: false },
  { task: 'Add CAA DNS record for Let\'s Encrypt', level: 'DNS', done: false },
  { task: 'Hide server tokens/version', level: 'Server', done: false },
  { task: 'Implement Content Security Policy', level: 'Server', done: false },
  { task: 'Configure secure cookies', level: 'Application', done: true }, // Implemented in the edge functions
  { task: 'Set up rate limiting', level: 'Server', done: false },
  { task: 'Implement JWT authentication', level: 'Application', done: true }, // Already using Supabase Auth
  { task: 'Configure Row-Level Security', level: 'Database', done: true }, // Already implemented in Supabase
  { task: 'Set up Cloudflare WAF', level: 'Infrastructure', done: false },
];
