import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsPositive,
  IsInt,
  Min,
} from 'class-validator';

export class CreateEnderecoDto {
  @ApiProperty({ example: 'Rua Major Ávila' })
  @IsString()
  @IsNotEmpty()
  rua: string;

  @ApiProperty({ example: '67', required: false })
  @IsString()
  @IsOptional()
  numero?: string;

  @ApiProperty({ example: 'Bl 2, Apt 101', required: false })
  @IsString()
  @IsOptional()
  complemento?: string;

  @ApiProperty({ example: 'Tijuca' })
  @IsString()
  @IsNotEmpty()
  bairro: string;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  aluno_id: number;
}
