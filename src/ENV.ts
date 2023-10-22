import { TypeOrmModuleOptions } from '@nestjs/typeorm/index';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { toBool } from './app/application_module/utils/util.functions';

config({
  path: path.join(
    process.cwd(),
    'environments',
    `${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}.env`,
  ),
});

export const ENV_DEVELOPMENT = 'development';
export const ENV_PRODUCTION = 'production';
export const ENV_STAGING = 'staging';

export const ENV = {
  port: +process.env.PORT,
  env: process.env.NODE_ENV || ENV_DEVELOPMENT,
  isProduction: process.env.NODE_ENV === ENV_PRODUCTION,
  isStaging: process.env.NODE_ENV === ENV_STAGING,
  isDevelopment: process.env.NODE_ENV === ENV_DEVELOPMENT,

  API_PREFIX: process.env.API_PREFIX,
  API_TITLE: process.env.API_TITLE,
  API_DESC: process.env.API_DESC,
  API_VERSION: process.env.API_VERSION,

  postgresDB: {
    type: process.env.TYPEORM_CONNECTION,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    database: process.env.TYPEORM_DATABASE,
    synchronize: process.env.TYPEORM_SYNCHRONIZE,
    logging: process.env.TYPEORM_LOGGING,
    sslMode: toBool(process.env.TYPEORM_SSLMODE) || false,
    ca: toBool(process.env.TYPEORM_SSLMODE)
      ? fs.readFileSync(process.env.TYPEORM_CA_PATH).toString()
      : null,
    rejectUnauthorized: process.env.TYPEORM_REJECT_UNAUTHORIZED,
  },
};

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: ENV.postgresDB.host,
  port: +ENV.postgresDB.port,
  username: ENV.postgresDB.username,
  password: ENV.postgresDB.password,
  database: ENV.postgresDB.database,
  ssl: ENV.postgresDB.sslMode
    ? {
        ca: ENV.postgresDB.ca,
        rejectUnauthorized: toBool(ENV.postgresDB.rejectUnauthorized),
      }
    : false,
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_sherlock_db',
  migrationsRun: false,
  // synchronize: parseToBool(ENV.postgresDB.synchronize),
  synchronize: true,
  logging: toBool(ENV.postgresDB.logging),
  autoLoadEntities: true,
};
