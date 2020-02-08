import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Endereco } from '../enderecos/endereco.entity';

@Entity()
export class Aluno extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  data_nascimento: Date;

  @Column()
  cpf: string;

  @Column('float')
  nota: number;

  @OneToMany(
    type => Endereco,
    endereco => endereco.aluno,
    { eager: true, cascade: ["insert", "update"] },
  )
  enderecos: Endereco[];
}
