import { createDatabase } from './config/database';
import { VehicleRepository } from './repositories/vehicleRepository';
import { randomUUID } from 'node:crypto';

const db = createDatabase('autocare.db');
const vehicles = new VehicleRepository(db);

vehicles.create({
  id: randomUUID(),
  name: 'Civic',
  type: 'car',
  currentKm: 85000,
  createdAt: new Date().toISOString(),
});

console.log('Veículos no banco:', vehicles.findAll());