import { createDatabase } from './config/database';
import { VehicleRepository } from './repositories/vehicleRepository';
import { createApp } from './app';

const db = createDatabase('autocare.db');
const vehicleRepository = new VehicleRepository(db);
const app = createApp(vehicleRepository);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`AutoCare API rodando em http://localhost:${PORT}`);
});