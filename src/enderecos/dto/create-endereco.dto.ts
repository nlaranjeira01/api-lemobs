import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class CreateEnderecoDto {
  @ApiProperty({ description: 'Nome da rua', example: 'Rua Major Ávila' })
  @IsString()
  @IsNotEmpty()
  rua: string;


  @ApiProperty({
    description: 'Número da casa',
    example: '67',
    required: false,
  })  @IsString()
  @IsOptional()
  numero?: string;

  @ApiProperty({
    description: 'Informação adicional sobre o local',
    example: 'Bl 2, Apt 101',
    required: false,
  })  @IsString()
  @IsOptional()
  complemento?: string;

  @ApiProperty({ description: 'Nome do bairro', example: 'Tijuca' })
  @IsString()
  @IsNotEmpty()
  bairro: string;

  @ApiProperty({ description: 'ID do aluno', example: 0 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  aluno_id: number;
}