import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
