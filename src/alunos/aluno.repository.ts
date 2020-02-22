import { Repository, EntityRepository, DeleteResult } from 'typeorm';
import { Aluno } from './aluno.entity';
import { AlunoDto } from './dto/aluno.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Endereco } from '../enderecos/endereco.entity';
import { NotFoundException } from '@nestjs/common';
import { FilterAlunosByNotaDto } from './dto/filter-alunos-by-nota.dto';
import { plainToClass } from 'class-transformer';
import moment = require('moment');

@EntityRepository(Aluno)
export class AlunoRepository extends Repository<Aluno> {
  async getAlunos(): Promise<Aluno[]> {
    return await this.find();
  }

  async getAlunoById(id: number): Promise<Aluno> {
    const aluno: Aluno = await this.findOne(id);

    if (!aluno) {
      throw new NotFoundException(`aluno(a) com ID = ${id} não existe`);
    }

    return aluno;
  }

  async createAluno(alunoDto: AlunoDto): Promise<Aluno> {
    const aluno = this.convertDtoToEntity(alunoDto);

    try {
      await aluno.save();
    } catch (error) {
      if (error.constraint === 'aluno_cpf_key') {
        //poderia ser também error.code === '23505'
        throw new ConflictException('este CPF já existe');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }

    return aluno;
  }

  async deleteAluno(id: number): Promise<void> {
    const delEndResult: DeleteResult = await this.deleteEnderecos(id);
    const delAlunoResult: DeleteResult = await this.delete(id);

    if (delAlunoResult.affected === 0) {
      throw new NotFoundException(`aluno(a) com ID = ${id} não existe`);
    }
  }

  async getAboveAverage(): Promise<Aluno[]> {
    const alunos : Aluno[] = await this.query(
      'SELECT * FROM aluno\
      WHERE aluno.nota > \
      (SELECT AVG(aluno.nota) FROM aluno)',
    );

    for (const aluno of alunos) {
      aluno.enderecos = await this.getEnderecos(aluno.id, null);
    }

    return plainToClass(Aluno, alunos);
  }

  async filterAlunosByNota(
    filterAlunosByNotaDto: FilterAlunosByNotaDto,
  ): Promise<Aluno[]> {
    const { criterio, nota } = filterAlunosByNotaDto;
    const alunos : Aluno[]= await this.query(`
      SELECT * FROM aluno
      WHERE aluno.nota ${criterio} ${nota}`);

    for (const aluno of alunos) {
      aluno.enderecos = await this.getEnderecos(aluno.id, null);
    }

    return plainToClass(Aluno, alunos);
  }

  /*
    Verifica se um aluno com o id especificado já existe, depois verifica se o cpf novo já existe em outro id, depois atualiza o novo usuário
  */
  async replaceAluno(id: number, alunoDto: AlunoDto): Promise<Aluno> {
    let aluno = await this.getAlunoById(id);
    const [alunoSameCpf] = await this.getAlunoByCpf(alunoDto.cpf);

    //caso a inserção seja em outro id, mas o cpf novo já exista, não será permitido. apenas será permitido um cpf existente se o id for o mesmo do cpf existente
    if (alunoSameCpf && alunoSameCpf.id !== aluno.id) {
      throw new ConflictException('este CPF já existe');
    }

    await this.deleteEnderecos(id); //ao dar save com o typeorm uma tentativa de update nos endereços é feita, causando erro de constraint de foreign key, portanto primeiro deletamos os endereços

    aluno = this.convertDtoToEntity(alunoDto);
    aluno.id = id;

    this.createQueryBuilder()
      .update()
      .set({
        nome: aluno.nome,
        data_nascimento: aluno.data_nascimento,
        cpf: aluno.cpf,
        nota: aluno.nota,
      })
      .where('aluno.id = :id', { id: id })
      .execute();

    for (const endereco of aluno.enderecos) {
      endereco.aluno = aluno;
      await endereco.save();
      delete endereco.aluno;
    }

    return aluno;
  }

  async getEnderecos(id: number, bairro: string) {
    console.log(bairro);
    return await this.query(
      `SELECT * FROM endereco WHERE endereco.aluno_id = ${id}` +
        (bairro ? ` AND endereco.bairro LIKE '${bairro}%'` : ''),
    );
  }

  private async getAlunoByCpf(cpf: string): Promise<Aluno[]> {
    return await this.query(`SELECT * FROM aluno WHERE aluno.cpf = '${cpf}'`);
  }

  private convertDtoToEntity(alunoDto: AlunoDto): Aluno {
    const { nome, data_nascimento, cpf, nota, enderecos } = alunoDto;
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
      aluno.enderecos = enderecos.map(alunoEnderecosDto => {
        const { rua, numero, complemento, bairro } = alunoEnderecosDto;

        const endereco = new Endereco();
        endereco.rua = rua;
        endereco.numero = numero;
        endereco.complemento = complemento;
        endereco.bairro = bairro;

        return endereco;
      });
    }

    return aluno;
  }

  private async deleteEnderecos(aluno_id: number): Promise<DeleteResult> {
    return await this.createQueryBuilder()
      .delete()
      .from(Endereco)
      .where('aluno_id = :id', { id: aluno_id })
      .execute();
  }
}
