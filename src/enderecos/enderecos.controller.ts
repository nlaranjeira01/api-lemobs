import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { EnderecosService } from './enderecos.service';
import { Endereco } from './endereco.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';

@ApiTags('Endereços')
@Controller('endereco')
export class EnderecosController {
  constructor(private enderecosService: EnderecosService) {}

  @ApiResponse({status: 200, description: 'Todos os endereços foram retornados'})
  @ApiResponse({status: 500, description: 'Erro interno'})
  @ApiQuery({ name: 'bairro', required: false })
  @Get()
  getEnderecos(@Query('bairro') bairro: string): Promise<Endereco[]> {
    return this.enderecosService.getEnderecos(bairro);
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

  @ApiResponse({status: 200, description: 'Endereço deletado'})
  @ApiResponse({status: 404, description: 'Endereço não encontrado'})
  @ApiResponse({status: 500, description: 'Erro interno'})
  @Delete('/:endereco_id')
  async deleteEndereco(@Param('endereco_id', ParseIntPipe) id: number): Promise<void> {
    return this.enderecosService.deleteEndereco(id)
  }

}
