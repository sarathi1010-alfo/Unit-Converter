/**
 * Core SEO configuration for the alfo.online ecosystem.
 * This centralized config ensures all canonical URLs, metadata, and
 * structured data point to the correct production subdomain, preventing
 * Vercel deployment URLs from being indexed.
 */

// Fallback for local development if the env var isn't set
const DEFAULT_URL = 'http://localhost:3000';

export function getSiteUrl() {
  // Always use the explicitly defined public site URL in production
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, ""); // Strip trailing slash
  }

  // Vercel deployment URLs (We DO NOT want these indexed, but we need them for branch previews)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return DEFAULT_URL;
}

export const SITE_URL = getSiteUrl();

// This should be used in the root layout to establish the base URL for all relative meta tags
export const METADATA_BASE = new URL(SITE_URL);
