import { PartialType } from '@nestjs/mapped-types';
import { CreateModelDto } from './create-model.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateModelDto extends PartialType(CreateModelDto) {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  context_length: number;

  @IsNotEmpty()
  @IsString()
  tokenizer: string;

  @IsNotEmpty()
  @IsString()
  modality: string;
}
