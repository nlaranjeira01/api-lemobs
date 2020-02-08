import { Repository, EntityRepository } from 'typeorm';
import { Aluno } from './aluno.entity';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Aluno)
export class AlunoRepository extends Repository<Aluno> {
  async getAlunos(): Promise<Aluno[]> {
    return await this.find();
  }

  async createAluno(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const { nome, data_nascimento, cpf, nota } = createAlunoDto;
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

    try{
      await aluno.save();
    }
    catch(error){
      if(error.constraint === 'aluno_cpf_key'){ //poderia ser também error.code === '23505'
        throw new ConflictException("This CPF is already registered");
      }
      else{
        throw new InternalServerErrorException();
      }
    }

    return aluno;
  }
}
