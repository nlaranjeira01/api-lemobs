import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Aluno } from '../alunos/aluno.entity';

@Entity()
export class Endereco extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @ManyToOne(
    type => Aluno,
    aluno => aluno.enderecos,
    { eager: false },
  )
  @JoinColumn({ name: 'aluno_id' }) //por padrão o TypeORM usaria alunoId, mas em respeito ao enunciado do desafio, aluno_id será usado
  aluno: Aluno;

  @Column()
  aluno_id: number;
}
