import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import { PostrgresService } from './postrgres.service';

@Global()
@Module({
  providers: [
    {
      provide: 'PG_CONNECTION',
      useValue: new Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'web',
        password: '3045',
        port: 5432,
      }),
    },
    PostrgresService,
  ],
  exports: ['PG_CONNECTION'],
})
export class PostgresModule {}
