import { DB } from '../config/database';
import { Vehicle, VehicleType } from '../models/vehicle';


type VehicleRow = {
  id: string;
  name: string;
  type: string;
  current_km: number;
  created_at: string;
};

function toDomain(row: VehicleRow): Vehicle {
  return {
    id: row.id,
    name: row.name,
    type: row.type as VehicleType,
    currentKm: row.current_km,
    createdAt: row.created_at,
  };
}

export class VehicleRepository {
  constructor(private readonly db: DB) {}

  findAll(): Vehicle[] {
    const rows = this.db
      .prepare('SELECT * FROM vehicles ORDER BY created_at DESC')
      .all() as VehicleRow[];
    return rows.map(toDomain);
  }

  findById(id: string): Vehicle | null {
    const row = this.db
      .prepare('SELECT * FROM vehicles WHERE id = ?')
      .get(id) as VehicleRow | undefined;
    return row ? toDomain(row) : null;
  }

  create(vehicle: Vehicle): Vehicle {
    this.db
      .prepare(`
        INSERT INTO vehicles (id, name, type, current_km, created_at)
        VALUES (@id, @name, @type, @currentKm, @createdAt)
      `)
      .run(vehicle);
    return vehicle;
  }
}