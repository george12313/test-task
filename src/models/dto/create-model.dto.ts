import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateModelDto {
  @IsNotEmpty()
  @IsString()
  model_id: string;

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
