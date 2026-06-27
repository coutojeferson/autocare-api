export type MaintenanceType = 'oil_change' | 'tire_rotation';

export type Maintenance = {
  id: string;
  vehicleId: string;
  type: MaintenanceType;
  lastKm: number;
  intervalKm: number;
  createdAt: string;
};