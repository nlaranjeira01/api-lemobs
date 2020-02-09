import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { EnderecosService } from './enderecos.service';
import { Endereco } from './endereco.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';

@ApiTags('Endereços')
@Controller('endereco')
export class EnderecosController {
  constructor(private enderecosService: EnderecosService) {}

  @ApiResponse({status: 200, description: 'Todos os endereços foram retornados'})
  @ApiResponse({status: 500, description: 'Erro interno'})
  @Get()
  getEnderecos(): Promise<Endereco[]> {
    return this.enderecosService.getEnderecos();
  }

  @ApiResponse({status: 201, description: 'Endereço criado'})
  @ApiResponse({status: 404, description: 'Aluno(a) não encontrado'})
  @ApiResponse({status: 500, description: 'Erro interno'})
  @Post()
  @UsePipes(new ValidationPipe())
  createEndereco(
    @Body() createEnderecoDto: CreateEnderecoDto,
  ): Promise<Endereco> {
    return this.enderecosService.createEndereco(createEnderecoDto);
  }
}
