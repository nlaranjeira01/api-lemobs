import { Injectable } from '@nestjs/common';
import { Endereco } from './endereco.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EnderecoRepository } from './endereco.repository';
import { CreateEnderecoDto } from './dto/create-endereco.dto';

@Injectable()
export class EnderecosService {
  constructor(
    @InjectRepository(EnderecoRepository)
    private enderecoRepository: EnderecoRepository,
  ) {}

  async createEndereco(
    createEnderecoDto: CreateEnderecoDto,
  ): Promise<Endereco> {
    return this.enderecoRepository.createEndereco(createEnderecoDto);
  }

  async getEnderecos(): Promise<Endereco[]> {
    return this.enderecoRepository.getEnderecos();
  }
  async deleteEndereco(id: number): Promise<void> {
    return this.enderecoRepository.deleteEndereco(id);
  }
}
