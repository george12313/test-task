import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { PgModelRepository } from "./models.repository";

@Module({
  controllers: [ModelsController],
  providers: [ModelsService, PgModelRepository],
})
export class ModelsModule {}
