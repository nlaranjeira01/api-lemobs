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

  async getAlunos(): Promise<Aluno[]> {
    return this.alunoRepository.getAlunos();
  }
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

  async deleteAluno(id: number): Promise<void> {
    const result = await this.alunoRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Aluno(a) com ID = ${id} não existe.`);
    }
  }
}
