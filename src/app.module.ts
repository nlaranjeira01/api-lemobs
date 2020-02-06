import { Module } from '@nestjs/common';
import { AlunosModule } from './alunos/alunos.module';

@Module({
  imports: [AlunosModule],
})
export class AppModule {}
