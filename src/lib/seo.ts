/**
 * Core SEO configuration for the alfo.online ecosystem.
 * This centralized config ensures all canonical URLs, metadata, and
 * structured data point to the correct production subdomain, preventing
 * Vercel deployment URLs from being indexed.
 */

const PRODUCTION_URL = 'https://unitflow.alfo.online';

export function getSiteUrl() {
  // Always use the explicitly defined public site URL if set
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, ""); // Strip trailing slash
  }

  // Hardcode fallback production domain to prevent Vercel preview domain hashes from leaking into canonical tags
  return PRODUCTION_URL;
}

export const SITE_URL = getSiteUrl();

// This should be used in the root layout to establish the base URL for all relative meta tags
export const METADATA_BASE = new URL(SITE_URL);
