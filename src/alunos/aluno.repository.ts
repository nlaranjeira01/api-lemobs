import { Repository, EntityRepository, SelectQueryBuilder, DeleteResult } from 'typeorm';
import { Aluno } from './aluno.entity';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Endereco } from '../enderecos/endereco.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Aluno)
export class AlunoRepository extends Repository<Aluno> {
  async getAlunos(): Promise<Aluno[]> {
    return await this.find();
  }

  async createAluno(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const { nome, data_nascimento, cpf, nota, enderecos } = createAlunoDto;
    const [day, month, year] = data_nascimento.split('/');
    const aluno = new Aluno();
    aluno.nome = nome;
    aluno.data_nascimento = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
    );
    aluno.cpf = cpf;
    aluno.nota = nota;

    if (enderecos) {
      aluno.enderecos = enderecos.map(createAlunoEnderecosDto => {
        const { rua, numero, complemento, bairro } = createAlunoEnderecosDto;

        const endereco = new Endereco();
        endereco.rua = rua;
        endereco.numero = numero;
        endereco.complemento = complemento;
        endereco.bairro = bairro;

        return endereco;
      });
    }

    try {
      await aluno.save();
    } catch (error) {
      if (error.constraint === 'aluno_cpf_key') {
        //poderia ser também error.code === '23505'
        throw new ConflictException('This CPF is already registered');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return aluno;
  }

  async deleteAluno(id: number) : Promise<void>{
    const delEndResult : DeleteResult = await this.createQueryBuilder().delete().from(Endereco).where("aluno_id = :id", {id: id}).execute();
    const delAlunoResult : DeleteResult = await this.delete(id);

    if(delAlunoResult.affected === 0){
      throw new NotFoundException(`Aluno(a) com ID = ${id} não existe.`);
    }
  }
}
