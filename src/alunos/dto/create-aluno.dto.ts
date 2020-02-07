import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { IsCPF } from '../validators/is-cpf.validator';
import { IsDate } from '../validators/is-date.validator';
import { IsInRange } from '../validators/is-in-range.validator';

export class CreateAlunoDto {
  @ApiProperty({ example: 'Joana' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ example: '02/04/2001' })
  @IsDate({
    message: "The date must follow the 'dd/mm/yyyy' format and must be valid.",
  })
  @IsNotEmpty()
  data_nascimento: Date;

  @ApiProperty({ example: '798.729.530-23' })
  @IsCPF({ message: 'The CPF number must be valid.' })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  //os decorators (de validação) são executados de baixo para cima
  @ApiProperty({ example: 8.5 })
  @IsInRange(0, 10, {
    message: 'The student grade must be a numeric value in the range [0,10].',
  })
  @IsNumber()
  @IsNotEmpty()
  nota: number;
}
