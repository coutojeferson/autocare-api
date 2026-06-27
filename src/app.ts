import express from 'express';
import { VehicleController } from './controllers/vehicleController';
import { vehicleRoutes } from './routes/vehicleRoutes';
import { VehicleRepository } from './repositories/vehicleRepository';

export function createApp(vehicleRepository: VehicleRepository) {
  const app = express();

  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  const vehicleController = new VehicleController(vehicleRepository);
  app.use('/vehicles', vehicleRoutes(vehicleController));

  return app;
}