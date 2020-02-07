import { Module } from '@nestjs/common';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoRepository } from './aluno.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlunoRepository])],
  controllers: [AlunosController],
  providers: [AlunosService],
})
export class AlunosModule {}
