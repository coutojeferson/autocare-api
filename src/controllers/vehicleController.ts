import { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { VehicleRepository } from '../repositories/vehicleRepository';
import { Vehicle } from '../models/vehicle';

export class VehicleController {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  findAll = (req: Request, res: Response): void => {
    const vehicles = this.vehicleRepository.findAll();
    res.json(vehicles);
  };

  create = (req: Request, res: Response): void => {
    const { name, type, currentKm } = req.body;

    const vehicle: Vehicle = {
      id: randomUUID(),
      name,
      type,
      currentKm,
      createdAt: new Date().toISOString(),
    };

    const created = this.vehicleRepository.create(vehicle);
    res.status(201).json(created);
  };
}