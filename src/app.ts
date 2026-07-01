import express from 'express';
import cors from "cors"
import { VehicleController } from './controllers/vehicleController';
import { MaintenanceController } from './controllers/maintenanceController';
import { vehicleRoutes } from './routes/vehicleRoutes';
import { maintenanceRoutes } from './routes/maintenanceRoutes';
import { VehicleRepository } from './repositories/vehicleRepository';
import { MaintenanceRepository } from './repositories/maintenanceRepository';

export function createApp(
  vehicleRepository: VehicleRepository,
  maintenanceRepository: MaintenanceRepository,
) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  const vehicleController = new VehicleController(vehicleRepository);
  const maintenanceController = new MaintenanceController(
    maintenanceRepository,
    vehicleRepository,
  );

  app.use('/vehicles', vehicleRoutes(vehicleController));
  app.use('/vehicles/:vehicleId/maintenances', maintenanceRoutes(maintenanceController));

  return app;
}