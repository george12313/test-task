import { Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { PgModelRepository } from './models.repository';

@Injectable()
export class ModelsService {
  constructor(private readonly modelRepository: PgModelRepository) {}
  create(createModelDto: CreateModelDto) {
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
