import unitsData from '@/data/units.json';

export type CategoryId =
  | 'length'
  | 'weight'
  | 'temperature'
  | 'volume'
  | 'area'
  | 'speed'
  | 'data'
  | 'currency'
  | 'cooking'
  | 'clothing';

export interface Unit {
  id: string;
  name: string;
  symbol: string;
  baseFactor: number;
}

export type UnitDictionary = Record<string, Unit>;

export function getUnitsForCategory(categoryId: CategoryId): UnitDictionary {
  const categories = unitsData as Record<string, Record<string, Omit<Unit, 'id'>>>;
  const categoryUnits = categories[categoryId];

  if (!categoryUnits) return {};

  const units: UnitDictionary = {};
  for (const [id, unit] of Object.entries(categoryUnits)) {
    units[id] = { id, ...unit };
  }
  return units;
}

export function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value;

  let celsius = value;
  // Convert to Celsius first
  if (from === 'c') {
    celsius = value;
  } else if (from === 'f') {
    celsius = (value - 32) * 5 / 9;
  } else if (from === 'k') {
    celsius = value - 273.15;
  }

  // Convert Celsius to target
  if (to === 'c') {
    return celsius;
  } else if (to === 'f') {
    return (celsius * 9 / 5) + 32;
  } else if (to === 'k') {
    return celsius + 273.15;
  }

  return celsius;
}

export function convertClothing(value: number, from: string, to: string): number {
  if (from === to) return value;

  // Standard US Men's to EU shoe size conversion
  // Formula: EU = US + 33 (approximate common standard)
  if (from === 'shoe-size-us' && to === 'shoe-size-eu') {
    return value + 33;
  }
  if (from === 'shoe-size-eu' && to === 'shoe-size-us') {
    return value - 33;
  }

  return value;
}

export function convert(value: number, fromUnitId: string, toUnitId: string, categoryId: CategoryId): number {
  if (fromUnitId === toUnitId) return value;

  if (categoryId === 'temperature') {
    return convertTemperature(value, fromUnitId, toUnitId);
  }

  if (categoryId === 'clothing') {
    return convertClothing(value, fromUnitId, toUnitId);
  }

  const units = getUnitsForCategory(categoryId);
  const fromUnit = units[fromUnitId];
  const toUnit = units[toUnitId];

  if (!fromUnit || !toUnit) {
    throw new Error(`Invalid units for category ${categoryId}: ${fromUnitId} -> ${toUnitId}`);
  }

  // Convert to base unit, then to target unit
  const baseValue = value * fromUnit.baseFactor;
  return baseValue / toUnit.baseFactor;
}

export function formatConversionResult(value: number): string {
  if (value === 0) return '0';
  if (Math.abs(value) < 0.000001 || Math.abs(value) > 1000000000) {
    return value.toExponential(4).replace(/\.?0+e/, 'e');
  }

  return parseFloat(value.toPrecision(7)).toString();
}
