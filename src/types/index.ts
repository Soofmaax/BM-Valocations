export type VehicleCategory = 'economy' | 'premium' | 'suv' | 'van';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: VehicleCategory;
}