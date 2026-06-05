import { generateAllPairs, getAllCategories, getAllUnits } from './pairs';
import { getUnitsForCategory } from './conversion';

// Re-export pair functions specifically for the pages that need them
export { generateAllPairs, getUnitsForCategory, getAllCategories, getAllUnits };

export function getPairBySlug(slug: string) {
  const pairs = generateAllPairs();
  return pairs.find(p => p.slug === slug);
}