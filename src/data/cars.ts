import { sanity } from '../lib/sanityClient';

export type Car = {
  _id: string;
  title: string;
  slug?: { current: string };
  brand?: string;
  model?: string;
  year?: number;
  listingType?: 'sale' | 'rental';
  price?: number; // sale price
  rentalPricePerDay?: number; // rental daily price
  mileage?: number;
  fuel?: string;
  transmission?: string;
  status?: string;
  features?: string[];
  description?: string;
  images?: { asset: any; url?: string }[];
};

export async function fetchCars(): Promise<Car[]> {
  const query = `*[_type=="car" && defined(publishedAt)] | order(publishedAt desc){
    _id, title, slug, brand, model, year, listingType, price, rentalPricePerDay, mileage, fuel, transmission, status, description, features,
    images[]{ ..., "url": asset->url }
  }`;
  return sanity.fetch(query);
}