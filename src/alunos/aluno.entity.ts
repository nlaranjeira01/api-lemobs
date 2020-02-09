import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Endereco } from '../enderecos/endereco.entity';
import { Transform } from 'class-transformer';
import * as moment from 'moment';

@Entity()
export class Aluno extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Transform(data_nascimento => moment(data_nascimento).format('DD/MM/YYYY')) //todas as rotas que retornam uma entidade de Aluno terão as datas transformadas de Date para dd/mm/yyyy
  @Column()
  data_nascimento: Date;

  @Column()
  cpf: string;

  @Column('float')
  nota: number;

  @OneToMany(
    type => Endereco,
    endereco => endereco.aluno,
    { eager: true, cascade: ['insert', 'update'] },
  )
  enderecos: Endereco[];
}
