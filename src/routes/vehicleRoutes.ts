import { Router } from 'express';
import { VehicleController } from '../controllers/vehicleController';

export function vehicleRoutes(vehicleController: VehicleController): Router {
  const router = Router();

  router.get('/', vehicleController.findAll);
  router.post('/', vehicleController.create);

  return router;
}