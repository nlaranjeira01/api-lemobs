import { Module } from '@nestjs/common';
import { AlunosController } from './alunos.controller';

@Module({
  controllers: [AlunosController]
})
export class AlunosModule {}
