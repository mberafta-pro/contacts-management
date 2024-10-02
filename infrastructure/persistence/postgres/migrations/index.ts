import dotenv from 'dotenv';
dotenv.config();

import sequelize from '@infrastructure/persistence/postgres/sequelize';
import { SequelizeStorage, Umzug } from 'umzug';

const umzug = new Umzug({
  migrations: { glob: 'migrations/*.ts' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

const runMigrations = async () => {
  try {
    console.log('Running Postgres migrations...');
    await sequelize.authenticate();
    await umzug.up();
    console.log('Migrations executed successfully');
  } catch (error) {
    console.log('An error occured while running migrations', error);
  } finally {
    sequelize.close();
  }
};

runMigrations();
