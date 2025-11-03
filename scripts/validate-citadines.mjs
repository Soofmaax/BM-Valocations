// Usage: node scripts/validate-citadines.mjs ./path/to/citadines.json
// Exits with code 0 if valid, 1 otherwise.

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

function fail(msg) {
  console.error(`[invalid] ${msg}`);
  process.exitCode = 1;
}

function isString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}
function isNumber(v) {
  return typeof v === 'number' && Number.isFinite(v);
}
function isInt(v) {
  return Number.isInteger(v);
}
function isBool(v) {
  return typeof v === 'boolean';
}
function isUrl(v) {
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
}

function validateSpecs(specs, idx) {
  const errors = [];
  if (specs == null) return errors;
  if (typeof specs !== 'object') {
    errors.push(`#${idx} specs must be an object`);
    return errors;
  }
  if (specs.seats != null && !(isNumber(specs.seats) && isInt(specs.seats) && specs.seats > 0)) {
    errors.push(`#${idx} specs.seats must be a positive integer`);
  }
  if (specs.doors != null && !(isNumber(specs.doors) && isInt(specs.doors) && specs.doors > 0)) {
    errors.push(`#${idx} specs.doors must be a positive integer`);
  }
  if (specs.transmission != null && !['auto', 'manual'].includes(specs.transmission)) {
    errors.push(`#${idx} specs.transmission must be 'auto' or 'manual'`);
  }
  if (specs.powerKw != null && !(isNumber(specs.powerKw) && specs.powerKw >= 0)) {
    errors.push(`#${idx} specs.powerKw must be a number >= 0`);
  }
  if (specs.rangeKm != null && !(isNumber(specs.rangeKm) && specs.rangeKm >= 0)) {
    errors.push(`#${idx} specs.rangeKm must be a number >= 0`);
  }
  if (specs.trunkLiters != null && !(isNumber(specs.trunkLiters) && specs.trunkLiters >= 0)) {
    errors.push(`#${idx} specs.trunkLiters must be a number >= 0`);
  }
  return errors;
}

function validateCar(car, idx) {
  const errors = [];
  if (!isNumber(car.id) || !isInt(car.id)) errors.push(`#${idx} id must be an integer number`);
  if (!isString(car.name)) errors.push(`#${idx} name must be a non-empty string`);
  if (!isString(car.emoji)) errors.push(`#${idx} emoji must be a non-empty string`);
  if (!isNumber(car.price) || car.price < 0) errors.push(`#${idx} price must be a number >= 0`);
  if (!isNumber(car.monthly) || car.monthly < 0) errors.push(`#${idx} monthly must be a number >= 0`);
  if (!isString(car.image) || !isUrl(car.image)) errors.push(`#${idx} image must be a valid URL string`);
  if (!isBool(car.electric)) errors.push(`#${idx} electric must be a boolean`);
  if (!isBool(car.available)) errors.push(`#${idx} available must be a boolean`);
  if (!isString(car.location)) errors.push(`#${idx} location must be a non-empty string`);
  if (!Array.isArray(car.tags) || !car.tags.every(isString)) errors.push(`#${idx} tags must be an array of non-empty strings`);

  if (car.gallery != null) {
    if (!Array.isArray(car.gallery) || !car.gallery.every((g) => isString(g) && isUrl(g))) {
      errors.push(`#${idx} gallery must be an array of URL strings`);
    }
  }

  errors.push(...validateSpecs(car.specs, idx));
  return errors;
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: node scripts/validate-citadines.mjs ./path/to/citadines.json');
    process.exit(1);
  }

  const fullPath = path.resolve(process.cwd(), file);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    process.exit(1);
  }

  let json;
  try {
    const raw = fs.readFileSync(fullPath, 'utf8');
    json = JSON.parse(raw);
  } catch (e) {
    console.error(`Failed to read/parse JSON: ${e.message}`);
    process.exit(1);
  }

  if (!Array.isArray(json)) {
    console.error('Root must be an array of cars');
    process.exit(1);
  }

  let hasErrors = false;
  const seenIds = new Set();
  json.forEach((car, i) => {
    const idx = i + 1;
    const errs = validateCar(car, idx);
    if (seenIds.has(car.id)) {
      errs.push(`#${idx} id ${car.id} is duplicated`);
    } else {
      seenIds.add(car.id);
    }
    if (errs.length) {
      hasErrors = true;
      errs.forEach((e) => fail(e));
    }
  });

  if (!hasErrors) {
    console.log(`[ok] ${json.length} cars validated successfully`);
  } else {
    process.exit(1);
  }
}

main();