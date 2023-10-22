import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from './databases/db.module';

const MODULES = [
  DatabaseModule,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../../..', 'uploads'),
    exclude: ['/api/v1/*'],
  }),
];

@Module({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class CommonModule {}
