import { Module } from '@nestjs/common';
import { AlunosModule } from './alunos/alunos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AlunosModule,
  ],
})

export class AppModule {}
