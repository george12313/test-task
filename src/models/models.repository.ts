import { Inject, Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './entities/model.entity';
import { ModelRepository } from './interfaces/repository.interface';

@Injectable()
export class PgModelRepository implements ModelRepository {
  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  async findById(id: number): Promise<Model | null> {
    const result = (await this.pool.query(
      `SELECT * FROM models WHERE id = $1`,
      [id],
    )) as QueryResult<Model>;
    return result.rows[0] || null;
  }

  async findAll(): Promise<Model[]> {
    const result = (await this.pool.query(
      `SELECT * FROM public.models`,
    )) as QueryResult<Model>;
    return result.rows;
  }

  async create(createModelDto: CreateModelDto): Promise<Model> {
    const { name, description, context_length, tokenizer, modality } =
      createModelDto;
    const result = (await this.pool.query(
      `INSERT INTO public.models
                            (name, description, context_length, tokenizer, modality)
                        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, description, context_length, tokenizer, modality],
    )) as QueryResult<Model>;
    return result.rows[0];
  }

  async update(
    id: number,
    updateModelDto: UpdateModelDto,
  ): Promise<Model | null> {
    const { name, description, context_length, tokenizer, modality } =
      updateModelDto;
    const result = (await this.pool.query(
      `UPDATE models SET name = $2,  description = $3, context_length = $4, tokenizer = $5, modality = $6
                       WHERE id = $1 RETURNING *`,
      [id, name, description, context_length, tokenizer, modality],
    )) as QueryResult<Model>;
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = (await this.pool.query(
      `DELETE FROM models WHERE id = $1 RETURNING model_id`,
      [id],
    )) as QueryResult<Pick<Model, 'model_id'>>;
    return Boolean(result.rowCount);
  }

  async saveModelDataArray(data: CreateModelDto[]): Promise<void> {
    const query = `
      INSERT INTO public.models (name, description, context_length, tokenizer, modality)
      VALUES ($1, $2, $3, $4, $5)`;

    const promises = data.map((item: any) => {
      const params = [
        item.name,
        item.description,
        item.context_length,
        item.architecture.tokenizer,
        item.architecture.modality,
      ];

      return this.pool.query(query, params); // Выполняем SQL-запрос для каждого объекта
    });

    await Promise.all(promises); // Выполняем все запросы параллельно
  }
}
