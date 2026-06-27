import { DB } from '../config/database';
import { Maintenance, MaintenanceType } from '../models/maintenance';

type MaintenanceRow = {
  id: string;
  vehicle_id: string;
  type: string;
  last_km: number;
  interval_km: number;
  created_at: string;
};

function toDomain(row: MaintenanceRow): Maintenance {
  return {
    id: row.id,
    vehicleId: row.vehicle_id,
    type: row.type as MaintenanceType,
    lastKm: row.last_km,
    intervalKm: row.interval_km,
    createdAt: row.created_at,
  };
}

export class MaintenanceRepository {
  constructor(private readonly db: DB) {}

  findByVehicleId(vehicleId: string): Maintenance[] {
    const rows = this.db
      .prepare('SELECT * FROM maintenances WHERE vehicle_id = ? ORDER BY created_at DESC')
      .all(vehicleId) as MaintenanceRow[];
    return rows.map(toDomain);
  }

  create(maintenance: Maintenance): Maintenance {
    this.db
      .prepare(`
        INSERT INTO maintenances (id, vehicle_id, type, last_km, interval_km, created_at)
        VALUES (@id, @vehicleId, @type, @lastKm, @intervalKm, @createdAt)
      `)
      .run(maintenance);
    return maintenance;
  }
}