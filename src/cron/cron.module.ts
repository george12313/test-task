import { ModelsHttpService } from "../models/models-http.service";
import { Module } from '@nestjs/common';
import { TasksService } from './cron.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ModelsHttpService, TasksService],
})
export class CronModule {}
