import { ENV } from 'src/ENV';
import { SwaggerConfig } from './swagger.interface';

export const SWAGGER_CONFIG: SwaggerConfig = {
  title: ENV.API_TITLE,
  description: ENV.API_DESC,
  version: ENV.API_VERSION,
};
