import { ApiProperty } from '@nestjs/swagger';

export class CreateAlunoDto {
  @ApiProperty({ example: 'Joana' })
  nome: string;

  @ApiProperty({ example: '02/04/2001' })
  data_nascimento: Date;

  @ApiProperty({ example: '79872953023' })
  cpf: string;

  @ApiProperty({ example: 8.5 })
  nota: number;
}
