import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresClient } from './clients/pg.client';

const pg = new PostgresClient().getPostgresConfig();

@Module({
  imports: [TypeOrmModule.forRoot(pg.ormConfig)],
})
export class DatabaseModule {}
