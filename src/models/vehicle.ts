export type VehicleType = 'car' | 'motorcycle';

export type Vehicle = {
  id: string;
  name: string;
  type: VehicleType;
  currentKm: number;
  createdAt: string;
};