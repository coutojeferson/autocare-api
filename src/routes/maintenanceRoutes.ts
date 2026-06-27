import { Router } from 'express';
import { MaintenanceController } from '../controllers/maintenanceController';

export function maintenanceRoutes(maintenanceController: MaintenanceController): Router {
  const router = Router({ mergeParams: true });

  router.get('/', maintenanceController.findByVehicle);
  router.post('/', maintenanceController.create);

  return router;
}