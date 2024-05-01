import { ModelsHttpService } from '../models/models-http.service';
import { Module } from '@nestjs/common';
import { TasksService } from './cron.service';
import { HttpModule } from '@nestjs/axios';
import { PgModelRepository } from '../models/models.repository';

@Module({
  imports: [HttpModule],
  providers: [ModelsHttpService, TasksService, PgModelRepository],
})
export class CronModule {}
