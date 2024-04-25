import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';

@Global()
@Module({
  providers: [
    {
      provide: 'PG_CONNECTION',
      useValue: new Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'postgres',
        password: 'postgres',
        port: 5432,
      }),
    },
  ],
  exports: ['PG_CONNECTION'],
})
export class PostgresModule {}
