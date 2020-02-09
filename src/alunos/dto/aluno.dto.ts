import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateNested,
  IsArray,
  IsNotEmptyObject,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsCPF } from '../validation/is-cpf-validation.decorator';
import { IsDateString } from '../validation/is-datestring-validation.decorator';
import { IsInRange } from '../validation/is-in-range-validation.decorator';

class AlunoEnderecosDto {
  @ApiProperty({ description: 'Nome da rua', example: 'Rua Major Ávila' })
  @IsString()
  @IsNotEmpty()
  rua: string;

  @ApiProperty({
    description: 'Número da casa',
    example: '67',
    required: false,
  })
  @IsString()
  @IsOptional()
  numero?: string;

  @ApiProperty({
    description: 'Informação adicional sobre o local',
    example: 'Bl 2, Apt 101',
    required: false,
  })
  @IsString()
  @IsOptional()
  complemento?: string;

  @ApiProperty({ description: 'Nome do bairro', example: 'Tijuca' })
  @IsString()
  @IsNotEmpty()
  bairro: string;
}

export class AlunoDto {
  @ApiProperty({ description: 'Nome do aluno(a)', example: 'Joana' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: "Data de nascimento do aluno(a) em formato 'yyyy-mm-dd'",
    example: '2001-04-02',
  })
  @IsDateString({
    message:
      "data_nascimento deve seguir o formato 'yyyy-mm-dd' e deve ser válida",
  })
  @IsNotEmpty()
  data_nascimento: string;

  @ApiProperty({
    description: 'Número do CPF no formato com ou sem pontos e traços',
    example: '798.729.530-23',
  })
  @IsCPF({ message: 'o número de CPF deve ser válido' })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({
    description: 'Nota do aluno(a) com valor entre 0 e 10',
    example: 8.5,
  })
  @IsInRange(0, 10, {
    message: 'nota deve ser um valor numérico no intervalo [0,10]',
  })
  @IsNumber()
  @IsNotEmpty()
  nota: number;

  @ApiProperty({
    description: 'Endereços do aluno(a)',
    required: false,
    type: [AlunoEnderecosDto],
  })
  @ValidateNested()
  @Type(() => AlunoEnderecosDto)
  @IsOptional()
  @IsArray()
  @IsNotEmptyObject({ each: true })
  enderecos?: AlunoEnderecosDto[];
}
