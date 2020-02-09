import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { Endereco } from './endereco.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { Aluno } from '../alunos/aluno.entity';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@EntityRepository(Endereco)
export class EnderecoRepository extends Repository<Endereco> {
  async getEnderecos(): Promise<Endereco[]> {
    return await this.find();
  }

  async createEndereco(
    createEnderecoDto: CreateEnderecoDto,
  ): Promise<Endereco> {
    const { rua, numero, complemento, bairro, aluno_id } = createEnderecoDto;

    const aluno = new Aluno();
    aluno.id = aluno_id;

    const endereco = new Endereco();
    endereco.rua = rua;
    endereco.numero = numero;
    endereco.complemento = complemento;
    endereco.bairro = bairro;
    endereco.aluno = aluno;

    try {
      await endereco.save();
    } catch (error) {
      if (error.code === '23503') {
        throw new NotFoundException(`aluno(a) com ID = ${aluno_id} não existe`);
      } else {
        throw new InternalServerErrorException();
      }
    }

    delete endereco.aluno;

    return endereco;
  }

  async deleteEndereco(id: number): Promise<void> {
    const delEndResult: DeleteResult = await this.delete(id);

    if (delEndResult.affected === 0) {
      throw new NotFoundException(`endereco com ID = ${id} não existe`);
    }
  }
}
