import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ModelsHttpService } from '../models/models-http.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly modelService: ModelsHttpService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  handleCron() {
    this.modelService.getAndSaveHttpModels();
    this.logger.debug('start cron')
  }
}
