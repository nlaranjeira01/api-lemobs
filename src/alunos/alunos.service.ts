import { Injectable } from '@nestjs/common';
import { Aluno } from './aluno.model';
import { CreateAlunoDto } from './dto/create-aluno.dto';

@Injectable()
export class AlunosService {
  private alunos: Aluno[] = [];

  getAllAlunos(): Aluno[] {
    return this.alunos;
  }

  createAluno(createAlunoDto : CreateAlunoDto) : Aluno{
    const {nome, data_nascimento, cpf, nota } = createAlunoDto;

    const aluno : Aluno = {
        id: this.alunos.length,
        nome,
        data_nascimento,
        cpf,
        nota, 
           
    }

    this.alunos.push(aluno);
    return aluno;
  }
}
