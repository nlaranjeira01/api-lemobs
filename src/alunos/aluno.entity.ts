import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Endereco } from '../enderecos/endereco.entity';
import { Transform, Type } from 'class-transformer';
import * as moment from 'moment';

@Entity()
export class Aluno extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  //Em algumas ocasiões a função 'plainToClass' é chamada, fazendo com que a data de nascimento seja transformada duas vezes, uma de Date => string (desejável) e outra de string => string (pois a data já foi transformada para string uma vez, fazendo o moment lançar um erro)
  //Portanto é necessário verificar se o tipo de data_nascimento é Date ou não antes de tentar transformar
  @Transform(data_nascimento =>
    data_nascimento instanceof Date
      ? moment(data_nascimento).format('DD/MM/YYYY')
      : data_nascimento,
  ) //todas as rotas que retornam uma entidade de Aluno terão as datas transformadas de Date para dd/mm/yyyy
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
  @Type(() => Endereco)
  enderecos: Endereco[];
}
