import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { FilterException } from './app/application_module/exceptions_handler/exception.filter';
import { PermissionGuard } from './app/application_module/guards/permission.quard';
import { FilterResponseInterceptor } from './app/application_module/interceptors/filterResponse.interceptor';
import { CommonModule } from './app/common_modules/common.module';
import { HealthModule } from './app/modules/health/health.module';

@Module({
  imports: [HealthModule, CommonModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: FilterResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: FilterException,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
