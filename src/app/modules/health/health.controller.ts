import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/app/application_module/types/successResponse.type';

@ApiTags('health')
@Controller('health')
export class HealthController {
  private static NAME = 'HealthController';

  @Get()
  public async getHealth(): Promise<any> {
    return new SuccessResponse({
      message: 'Server is running...',
    });
  }
}
