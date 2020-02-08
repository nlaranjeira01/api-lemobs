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
import { IsCPF } from '../validation/is-cpf.validation';
import { IsDateString } from '../validation/is-datestring.validation';
import { IsInRange } from '../validation/is-in-range.validation';

class CreateAlunoEnderecosDto {
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
}

export class CreateAlunoDto {
  @ApiProperty({ example: 'Joana' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: '02/04/2001' })
  @IsDateString({
    message:
      "data_nascimento must follow the 'dd/mm/yyyy' format and must be valid",
  })
  @IsNotEmpty()
  data_nascimento: string;

  @ApiProperty({ example: '798.729.530-23' })
  @IsCPF({ message: 'cpf number must be valid' })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({ example: 8.5 })
  @IsInRange(0, 10, {
    message: 'nota must be a numeric value in the range [0,10]',
  })
  @IsNumber()
  @IsNotEmpty()
  nota: number;

  @ApiProperty({
    required: false,
    type: [CreateAlunoEnderecosDto],
  })
  @ValidateNested()
  @Type(() => CreateAlunoEnderecosDto)
  @IsOptional()
  @IsArray()
  @IsNotEmptyObject({ each: true })
  enderecos?: CreateAlunoEnderecosDto[];
}
