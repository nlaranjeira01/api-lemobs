import { Repository, EntityRepository } from 'typeorm';
import { Aluno } from './aluno.entity';
import { CreateAlunoDto } from './dto/create-aluno.dto';

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
    await aluno.save();

    return aluno;
  }
}
