import { Module } from '@nestjs/common';
import { EnderecosController } from './enderecos.controller';
import { EnderecosService } from './enderecos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnderecoRepository } from './endereco.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EnderecoRepository])],
  controllers: [EnderecosController],
  providers: [EnderecosService],
})
export class EnderecosModule {}
