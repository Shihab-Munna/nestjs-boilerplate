import { ormConfig } from './../../../../ENV';
export class PostgresClient {
  public getPostgresConfig() {
    return { ormConfig };
  }
}
