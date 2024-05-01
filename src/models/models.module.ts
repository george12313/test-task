import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { PgModelRepository } from './models.repository';
import { HttpModule } from '@nestjs/axios';
import { ModelsHttpService } from './models-http.service';

@Module({
  imports: [HttpModule],
  controllers: [ModelsController],
  providers: [ModelsService, PgModelRepository, ModelsHttpService],
})
export class ModelsModule {}
