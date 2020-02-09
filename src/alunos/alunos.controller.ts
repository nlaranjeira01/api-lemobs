import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
  Query,
} from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { ApiTags, ApiParam, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AlunoDto } from './dto/aluno.dto';
import { Aluno } from './aluno.entity';
import { FilterAlunosByNotaDto } from './dto/filter-alunos-by-nota.dto';

@ApiTags('Alunos')
@Controller('aluno')
export class AlunosController {
  constructor(private alunosService: AlunosService) {}

  @ApiResponse({ status: 200, description: 'Todos os alunos foram retornados' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  @Get()
  getAlunos(): Promise<Aluno[]> {
    return this.alunosService.getAlunos();
  }

  @ApiResponse({
    status: 200,
    description:
      'Todos os alunos(as) que obedecem aos critérios foram retornados',
  })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  @Get('/media')
  getAboveAverage(): Promise<Aluno[]> {
    return this.alunosService.getAboveAverage();
  }

  @ApiResponse({
    status: 200,
    description:
      'Todos os alunos(as) que obedecem aos critérios foram retornados',
  })
  @ApiResponse({ status: 400, description: 'Erro na validação dos parâmetros' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  @ApiParam({ name: 'criterio', type: 'string' })
  @ApiParam({ name: 'nota', type: 'number' })
  @Get('/nota/:criterio/:nota')
  @UsePipes(new ValidationPipe({ transform: true }))
  filterAlunosByNota(
    @Param() filterAlunosByNotaDto: FilterAlunosByNotaDto,
  ): Promise<Aluno[]> {
    console.log(filterAlunosByNotaDto);
    return this.alunosService.filterAlunosByNota(filterAlunosByNotaDto);
  }

  @ApiResponse({ status: 200, description: 'Endereços retornados' })
  @ApiResponse({ status: 404, description: 'Aluno(a) não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  @ApiQuery({ name: 'bairro', required: false })
  @Get('/:aluno_id/endereco')
  getEnderecos(
    @Param('aluno_id', ParseIntPipe) id: number,
    @Query('bairro') bairro: string,
  ): Promise<Object> {
    return this.alunosService.getEnderecos(id, bairro);
  }

  @ApiResponse({ status: 200, description: 'Aluno(a) retornado' })
  @ApiResponse({ status: 404, description: 'Aluno(a) não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  @Get('/:aluno_id')
  getAlunoById(@Param('aluno_id', ParseIntPipe) id: number): Promise<Aluno> {
    return this.alunosService.getAlunoById(id);
  }

  @ApiResponse({ status: 201, description: 'Aluno(a) criado' })
  @ApiResponse({ status: 400, description: 'Erro na validação dos parâmetros' })
  @ApiResponse({ status: 409, description: 'Conflito de CPF' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createAluno(@Body() alunoDto: AlunoDto): Promise<Aluno> {
    return this.alunosService.createAluno(alunoDto);
  }

  @ApiResponse({ status: 200, description: 'Aluno(a) deletado' })
  @ApiResponse({ status: 404, description: 'Aluno(a) não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  @Delete('/:aluno_id')
  deleteAluno(@Param('aluno_id', ParseIntPipe) id: number): Promise<void> {
    return this.alunosService.deleteAluno(id);
  }

  @ApiResponse({ status: 200, description: 'Aluno(a) editado' })
  @ApiResponse({ status: 400, description: 'Erro na validação dos parâmetros' })
  @ApiResponse({ status: 409, description: 'Conflito de CPF' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  @Put('/:aluno_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  putAluno(
    @Param('aluno_id', ParseIntPipe) id: number,
    @Body() alunoDto: AlunoDto,
  ): Promise<Aluno> {
    return this.alunosService.putAluno(id, alunoDto);
  }
}
