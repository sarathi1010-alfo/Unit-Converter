import unitsData from '@/data/units.json';
import categoriesData from '@/data/categories.json';

export function getAllCategories() {
  return categoriesData;
}

export function getAllUnits() {
  return unitsData;
}

export function generateAllPairs() {
  const pairs: { categoryId: string, from: string, to: string, slug: string }[] = [];

  for (const [categoryId, categoryUnits] of Object.entries(unitsData)) {
    const unitIds = Object.keys(categoryUnits);

    for (let i = 0; i < unitIds.length; i++) {
      for (let j = 0; j < unitIds.length; j++) {
        if (i !== j) {
          const from = unitIds[i];
          const to = unitIds[j];
          pairs.push({
            categoryId,
            from,
            to,
            slug: `${from}-to-${to}`
          });
        }
      }
    }
  }

  return pairs;
}

export function getPairBySlug(slug: string) {
  const pairs = generateAllPairs();
  return pairs.find(p => p.slug === slug);
}