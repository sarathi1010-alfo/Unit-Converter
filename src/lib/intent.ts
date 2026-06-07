export type IntentClass =
  | 'calculation'
  | 'informational'
  | 'comparison'
  | 'diagnostic'
  | 'navigational';

/**
 * Classifies the search intent of a given URL slug or path.
 * This is used to adjust SEO metadata, schema, and page structure dynamically.
 */
export function classifyIntent(path: string): IntentClass {
  const normalizedPath = path.toLowerCase();

  // Explicit paths
  if (normalizedPath.startsWith('/convert/') || normalizedPath.endsWith('-converter')) {
    return 'calculation';
  }

  if (normalizedPath.startsWith('/vs/') || normalizedPath.includes('-vs-')) {
    return 'comparison';
  }

  if (normalizedPath.startsWith('/guides/')) {
    // Determine if it's diagnostic vs informational based on keywords
    if (
      normalizedPath.includes('why') ||
      normalizedPath.includes('error') ||
      normalizedPath.includes('fix') ||
      normalizedPath.includes('wrong')
    ) {
      return 'diagnostic';
    }
    return 'informational';
  }

  if (normalizedPath.startsWith('/category/')) {
    return 'navigational';
  }

  // Fallback for general pages (like root index)
  if (normalizedPath === '/' || normalizedPath === '') {
    return 'navigational';
  }

  return 'informational'; // Default safe intent
}

/**
 * Returns the recommended crawl priority for a given intent.
 */
export function getIntentPriority(intent: IntentClass): number {
  switch (intent) {
    case 'navigational':
      return 1.0; // Home, category hubs
    case 'informational':
    case 'diagnostic':
      return 0.9; // Guides, troubleshooting
    case 'calculation':
      return 0.8; // Specific tool instances
    case 'comparison':
      return 0.7; // Vs pages
    default:
      return 0.5;
  }
}
