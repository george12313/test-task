import { Model } from '../entities/model.entity';
import { CreateModelDto } from '../dto/create-model.dto';
import { UpdateModelDto } from '../dto/update-model.dto';

export interface ModelRepository {
  findById(id: number): Promise<Model | null>;
  findAll(): Promise<Model[]>;
  create(user: CreateModelDto): Promise<Model>;
  update(id: number, updateModelDto: UpdateModelDto): Promise<Model | null>;
  delete(id: number): Promise<boolean>;
  saveModelDataArray(data: CreateModelDto[]): Promise<void>;
}
