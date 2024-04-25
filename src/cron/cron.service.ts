import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ModelsService } from '../models/models.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly modelService: ModelsService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  handleCron() {
    this.modelService.findAll();
    this.logger.debug('Called when the current second is 45');
  }
}
