import { Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { PgModelRepository } from './models.repository';
import { ModelsController } from "./models.controller";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class BaseRemoutService<T> {
  execute(createModelDto: any) {
    return createModelDto;
  }
}

@Injectable()
export class ModelsService extends BaseRemoutService<ModelsController> {
  constructor(private readonly modelRepository: PgModelRepository) {
    super();
  }
  create(createModelDto: CreateModelDto) {
    this.execute(createModelDto);
    return this.modelRepository.create(createModelDto);
  }

  findAll() {
    return this.modelRepository.findAll();
  }

  findById(id: number) {
    return this.modelRepository.findById(id);
  }

  update(id: number, updateModelDto: UpdateModelDto) {
    return this.modelRepository.update(id, updateModelDto);
  }

  remove(id: number) {
    return this.modelRepository.delete(id);
  }
}
