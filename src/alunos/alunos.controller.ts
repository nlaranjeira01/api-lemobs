import { Controller, Get } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { ApiTags } from '@nestjs/swagger';
import { Aluno } from './aluno.model';

@ApiTags('Alunos')
@Controller('aluno')
export class AlunosController {
  constructor(private alunosService: AlunosService) {}

  @Get()
  getAllAlunos(): Aluno[] {
    return this.alunosService.getAllAlunos();
  }
}
