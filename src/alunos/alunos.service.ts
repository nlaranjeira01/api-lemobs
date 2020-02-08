import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { AlunoRepository } from './aluno.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from './aluno.entity';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(AlunoRepository)
    private alunoRepository: AlunoRepository,
  ) {}

  async getAlunoById(id: number): Promise<Aluno> {
    const aluno: Aluno = await this.alunoRepository.findOne(id);

    if (!aluno) {
      throw new NotFoundException(`Aluno(a) com ID = ${id} não existe.`);
    }

    return aluno;
  }

  async createAluno(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    return this.alunoRepository.createAluno(createAlunoDto);
  }

  /*   private alunos: Aluno[] = [];

  getAllAlunos(): Aluno[] {
    return this.alunos;
  }

  deleteAluno(id: number): void {
    const aluno: Aluno = this.getAlunoById(id);

    this.alunos = this.alunos.filter(aluno => aluno.id !== id);
  }
   */
}
