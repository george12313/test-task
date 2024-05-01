import { Injectable, OnModuleInit } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class PostrgresService implements OnModuleInit {
  async onModuleInit() {
    console.log('Applying database migrations...');

    exec('npm run migrate:up', (error) => {
      if (error) {
        console.error(`Error applying migrations: ${error.message}`);
      } else {
        console.log('Database migrations applied successfully');
      }
    });
  }
}
