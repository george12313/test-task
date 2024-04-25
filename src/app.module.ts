import { Module } from '@nestjs/common';
import { ModelsModule } from './models/models.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PostgresModule } from './tools/providers/postrgres/postgres.module';

@Module({
  imports: [ScheduleModule.forRoot(), PostgresModule, ModelsModule],
})
export class AppModule {}
