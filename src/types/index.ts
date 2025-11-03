export type VehicleCategory = 'economy' | 'premium' | 'suv' | 'van';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: VehicleCategory;
}

/**
 * Citadine landing specific types
 */
export interface CitadineCar {
  id: number;
  name: string;
  emoji: string;
  price: number;
  monthly: number;
  image: string;
  electric: boolean;
  available: boolean;
  location: string;
  tags: string[];
}