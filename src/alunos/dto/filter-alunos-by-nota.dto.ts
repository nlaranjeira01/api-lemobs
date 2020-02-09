import { IsNotEmpty, IsString, IsNumber, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { IsInRange } from '../validation/is-in-range-validation.decorator';

export class FilterAlunosByNotaDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['>', '<'], { message: "o critério deve ser apenas '>' ou '<'" })
  criterio: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInRange(0, 10, {
    message: 'nota deve ser um valor numérico no intervalo [0,10]',
  })
  @Type(() => Number)
  nota: Number;
}
