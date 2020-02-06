import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { ApiTags } from '@nestjs/swagger';
import { Aluno } from './aluno.model';
import { CreateAlunoDto } from './dto/create-aluno.dto';

@ApiTags('Alunos')
@Controller('aluno')
export class AlunosController {
  constructor(private alunosService: AlunosService) {}

  @Get()
  getAllAlunos(): Aluno[] {
    return this.alunosService.getAllAlunos();
  }

  @Get('/:id')
  getAlunoById(@Param('id', ParseIntPipe) id: number): Aluno {
    return this.alunosService.getAlunoById(id);
  }

  @Post()
  createAluno(@Body() createAlunoDto: CreateAlunoDto): Aluno {
    return this.alunosService.createAluno(createAlunoDto);
  }
}
