import { Module } from '@nestjs/common';
import { ModelsModule } from './models/models.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PostgresModule } from './tools/providers/postrgres/postgres.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [ScheduleModule.forRoot(), CronModule, PostgresModule, ModelsModule],
  providers: [],
})
export class AppModule {}
