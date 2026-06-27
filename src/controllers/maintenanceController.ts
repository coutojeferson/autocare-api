import { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { MaintenanceRepository } from '../repositories/maintenanceRepository';
import { VehicleRepository } from '../repositories/vehicleRepository';
import { Maintenance } from '../models/maintenance';

export class MaintenanceController {
  constructor(
    private readonly maintenanceRepository: MaintenanceRepository,
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  findByVehicle = (req: Request, res: Response): void => {
    const vehicleId = String(req.params.vehicleId);
    const vehicle = this.vehicleRepository.findById(vehicleId);
    if (!vehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
      return;
    }

    const maintenances = this.maintenanceRepository.findByVehicleId(vehicleId);
    res.json(maintenances);
  };

  create = (req: Request, res: Response): void => {
    const vehicleId = String(req.params.vehicleId);
    const { type, lastKm, intervalKm } = req.body;

    const vehicle = this.vehicleRepository.findById(vehicleId);
    if (!vehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
      return;
    }

    const maintenance: Maintenance = {
      id: randomUUID(),
      vehicleId,
      type,
      lastKm,
      intervalKm,
      createdAt: new Date().toISOString(),
    };

    const created = this.maintenanceRepository.create(maintenance);
    res.status(201).json(created);
  };
}