import express from 'express';
import { randomUUID } from 'node:crypto';
import { VehicleRepository } from './repositories/vehicleRepository';
import { Vehicle } from './models/vehicle';

export function createApp(vehicleRepository: VehicleRepository) {
  const app = express();

  // middleware: transforma o corpo JSON da requisição em req.body
  app.use(express.json());

  // health check — só pra confirmar que o servidor tá vivo
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/vehicles', (req, res) => {
    const vehicles = vehicleRepository.findAll();
    res.json(vehicles);
  });

  app.post('/vehicles', (req, res) => {
    const { name, type, currentKm } = req.body;

    const vehicle: Vehicle = {
      id: randomUUID(),
      name,
      type,
      currentKm,
      createdAt: new Date().toISOString(),
    };

    const created = vehicleRepository.create(vehicle);
    res.status(201).json(created);
  });

  return app;
}