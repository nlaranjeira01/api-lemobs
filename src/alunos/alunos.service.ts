import { Injectable } from '@nestjs/common';
import { Aluno } from './aluno.model';

@Injectable()
export class AlunosService {
  private alunos: Aluno[] = [];

  getAllAlunos(): Aluno[] {
    return this.alunos;
  }
}
