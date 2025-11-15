import { sanity } from '../lib/sanityClient';

export type Car = {
  _id: string;
  title: string;
  slug?: { current: string };
  brand?: string;
  model?: string;
  year?: number;
  price?: number;
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
    _id, title, slug, brand, model, year, price, mileage, fuel, transmission, status, description, features,
    images[]{ ..., "url": asset->url }
  }`;
  return sanity.fetch(query);
}