import { Injectable } from '@nestjs/common';
import { AlunoDto } from './dto/aluno.dto';
import { AlunoRepository } from './aluno.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from './aluno.entity';
import { FilterAlunosByNotaDto } from './dto/filter-alunos-by-nota.dto';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(AlunoRepository)
    private alunoRepository: AlunoRepository,
  ) {}

  async getAlunos(): Promise<Aluno[]> {
    const alunos = await this.alunoRepository.getAlunos();

    for (let i = 0; i < alunos.length; i++) {
      alunos[i].cpf = this.formatCpf(alunos[i].cpf);
    }

    return alunos;
  }

  async getAlunoById(id: number): Promise<Aluno> {
    const aluno = await this.alunoRepository.getAlunoById(id);
    aluno.cpf = this.formatCpf(aluno.cpf);
    return aluno;
  }

  async filterAlunosByNota(
    filterAlunosByNota: FilterAlunosByNotaDto,
  ): Promise<Aluno[]> {
    const alunos = await this.alunoRepository.filterAlunosByNota(
      filterAlunosByNota,
    );

    for (let i = 0; i < alunos.length; i++) {
      alunos[i].cpf = this.formatCpf(alunos[i].cpf);
    }

    return alunos;
  }

  async createAluno(alunoDto: AlunoDto): Promise<Aluno> {
    alunoDto.cpf = alunoDto.cpf.replace(/\-|\./g, '');
    const aluno = await this.alunoRepository.createAluno(alunoDto);
    aluno.cpf = this.formatCpf(aluno.cpf);
    return aluno;
  }

  async deleteAluno(id: number): Promise<void> {
    return this.alunoRepository.deleteAluno(id);
  }

  async getAboveAverage(): Promise<Aluno[]> {
    return this.alunoRepository.getAboveAverage();
  }

  async putAluno(id: number, alunoDto: AlunoDto): Promise<Aluno> {
    alunoDto.cpf = alunoDto.cpf.replace(/\-|\./g, '');
    const aluno = await this.alunoRepository.replaceAluno(id, alunoDto);
    aluno.cpf = this.formatCpf(aluno.cpf);
    return aluno;
  }

  async getEnderecos(id: number, bairro: string): Promise<Object> {
    const enderecos = await this.alunoRepository.getEnderecos(id, bairro);
    return {
      total: enderecos.length,
      enderecos: enderecos.map(({ rua, numero, complemento, bairro }) => {
        console.log(rua, numero, complemento, bairro);
        const endereco =
          rua +
          (numero ? ', ' + numero : '') +
          (complemento ? ' - ' + complemento : '');

        return { endereco, bairro };
      }),
    };
  }

  private formatCpf(cpf: string): string {
    return cpf
      .padStart(11, '0')
      .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/g, '$1.$2.$3-$4');
  }
}
