import { Module } from '@nestjs/common';
import { AlunosModule } from './alunos/alunos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { EnderecosModule } from './enderecos/enderecos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AlunosModule,
    EnderecosModule,
  ],
})
export class AppModule {}
