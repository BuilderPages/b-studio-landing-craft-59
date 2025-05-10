
// Maximum number of requests allowed per IP in the specified time window
const MAX_REQUESTS = 100;
// Time window in milliseconds (1 minute)
const TIME_WINDOW = 60 * 1000;

// Store for rate limiting
interface RateLimitEntry {
  count: number;
  timestamp: number;
}

const rateLimitStore: Record<string, RateLimitEntry> = {};
const blockedIPs: Set<string> = new Set();

/**
 * Rate limiting function to prevent DDoS attacks
 * @param ip The IP address to check
 * @returns Boolean indicating if the request should be allowed
 */
export const checkRateLimit = (ip: string): boolean => {
  // If IP is blocked, reject immediately
  if (blockedIPs.has(ip)) {
    return false;
  }
  
  const now = Date.now();
  const entry = rateLimitStore[ip];
  
  // If this is the first request or the entry has expired, create a new entry
  if (!entry || now - entry.timestamp > TIME_WINDOW) {
    rateLimitStore[ip] = {
      count: 1,
      timestamp: now
    };
    return true;
  }
  
  // If the IP has exceeded the maximum number of requests in the time window
  if (entry.count >= MAX_REQUESTS) {
    console.warn(`Rate limit exceeded for IP: ${ip}`);
    return false;
  }
  
  // Increment the request count
  entry.count++;
  return true;
};

/**
 * Block an IP address
 * @param ip The IP address to block
 */
export const blockIP = (ip: string): void => {
  blockedIPs.add(ip);
  console.warn(`IP blocked: ${ip}`);
};

/**
 * Unblock an IP address
 * @param ip The IP address to unblock
 */
export const unblockIP = (ip: string): void => {
  blockedIPs.delete(ip);
  console.log(`IP unblocked: ${ip}`);
};

/**
 * Get all blocked IPs
 * @returns Array of blocked IP addresses
 */
export const getBlockedIPs = (): string[] => {
  return Array.from(blockedIPs);
};

/**
 * Sanitize user input to prevent XSS attacks
 * @param input The user input to sanitize
 * @returns Sanitized input
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Validate a request origin to prevent CSRF attacks
 * @param origin The origin to validate
 * @param allowedOrigins Array of allowed origins
 * @returns Boolean indicating if the origin is valid
 */
export const validateOrigin = (origin: string, allowedOrigins: string[]): boolean => {
  return allowedOrigins.includes(origin);
};

/**
 * Generate a secure random token for CSRF protection
 * @returns A random token
 */
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Basic checks for SQL injection attempts
 * @param input The input to check
 * @returns Boolean indicating if the input potentially contains SQL injection
 */
export const hasSQLInjection = (input: string): boolean => {
  if (!input) return false;
  
  const sqlPatterns = [
    /(\s|^)(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|EXEC|UNION|WHERE)(\s|$)/i,
    /(\s|^)(OR|AND)(\s+)('|")(.*?)('|")(\s*)(=)(\s*)('|")(.*?)('|")/i,
    /--/,
    /;.*/,
    /\/\*/,
    /\*\//
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
};

// Initialize CSRF token in localStorage if it doesn't exist
export const initCSRFProtection = (): string => {
  let token = localStorage.getItem('csrfToken');
  if (!token) {
    token = generateCSRFToken();
    localStorage.setItem('csrfToken', token);
  }
  return token;
};

// Get client information for logging
export const getClientInfo = (): Record<string, any> => {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenSize: {
      width: window.screen.width,
      height: window.screen.height
    },
    viewportSize: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    timestamp: new Date().toISOString()
  };
};

// Enhanced date utility function to safely format dates
export const enhanceDateFormat = (date: Date | string | null | undefined, format: string, fallback: string = "תאריך לא זמין"): string => {
  if (!date) return fallback;
  
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return fallback;
    
    const { format: formatFn } = require('date-fns');
    return formatFn(dateObj, format);
  } catch (error) {
    console.error("Error formatting date:", error);
    return fallback;
  }
};
