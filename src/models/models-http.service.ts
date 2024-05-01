import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { PgModelRepository } from "./models.repository";

export enum ERequestUrl {
  models = 'https://openrouter.ai/api/v1/models',
}

@Injectable()
export class ModelsHttpService {
  constructor(private readonly httpService: HttpService,
              private readonly modelRepository: PgModelRepository
  ) {}
  getAndSaveHttpModels(): void {
    const res = this.httpService
      .get(ERequestUrl.models)
      .pipe(map((response) => response.data));

    res.subscribe({
      next: async (data) => {
       await this.modelRepository.saveModelDataArray(data.data);
      },
      error: (error) => {
        console.error('Ошибка:', error); // Обработка ошибки
      },
    });
  }
}
