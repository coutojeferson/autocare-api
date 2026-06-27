import { createDatabase } from './config/database';
import { VehicleRepository } from './repositories/vehicleRepository';
import { createApp } from './app';
import { MaintenanceRepository } from './repositories/maintenanceRepository';

const db = createDatabase('autocare.db');
const vehicleRepository = new VehicleRepository(db);
const maintenanceRepository = new MaintenanceRepository(db);
const app = createApp(vehicleRepository, maintenanceRepository);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`AutoCare API rodando em http://localhost:${PORT}`);
});