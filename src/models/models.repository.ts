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
      `SELECT * FROM models`,
    )) as QueryResult<Model>;
    return result.rows;
  }

  async create(createModelDto: CreateModelDto): Promise<Model> {
    const { model_id, name, description, context_length, tokenizer, modality } =
      createModelDto;

    const result = (await this.pool.query(
      `INSERT INTO models
                            (model_id, description, context_length, tokenizer, modality)
                        VALUES ($1, $2) RETURNING *`,
      [model_id, name, description, context_length, tokenizer, modality],
    )) as QueryResult<Model>;
    return result.rows[0];
  }

  async update(
    id: number,
    updateModelDto: UpdateModelDto,
  ): Promise<Model | null> {
    const { model_id, description, context_length, tokenizer, modality } =
      updateModelDto;
    const result = (await this.pool.query(
      'UPDATE models SET model_id = $2, description = $3, context_length = $4, tokenizer = $5, modality = $6  WHERE id = $1 RETURNING *',
      [id, model_id, description, context_length, tokenizer, modality],
    )) as QueryResult<Model>;
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = (await this.pool.query(
      `DELETE FROM models WHERE id = $1 RETURNING id`,
      [id],
    )) as QueryResult<Pick<Model, 'model_id'>>;
    return Boolean(result.rowCount);
  }
}
