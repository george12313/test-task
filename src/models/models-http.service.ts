import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

export enum ERequestUrl {
  models = 'https://openrouter.ai/api/v1/models',
}

@Injectable()
export class ModelsHttpService {
  constructor(private readonly httpService: HttpService) {}
  getAndSaveHttpModels(): void {
    const res = this.httpService
      .get(ERequestUrl.models)
      .pipe(map((response) => response.data));

    res.subscribe({
      next: (data) => {
        console.log('Данные:', data); // Обработка полученных данных
      },
      error: (error) => {
        console.error('Ошибка:', error); // Обработка ошибки
      },
    });
  }
}
