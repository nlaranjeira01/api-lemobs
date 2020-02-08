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
} from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './aluno.entity';

@ApiTags('Alunos')
@Controller('aluno')
export class AlunosController {
  constructor(private alunosService: AlunosService) {}

  @Get()
  getAlunos(): Promise<Aluno[]> {
    return this.alunosService.getAlunos();
  }

  @Get('/:id')
  getAlunoById(@Param('id', ParseIntPipe) id: number): Promise<Aluno> {
    return this.alunosService.getAlunoById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createAluno(@Body() createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    console.log(createAlunoDto.enderecos[0].numero);
    return this.alunosService.createAluno(createAlunoDto);
  }

  @Delete('/:id')
  deleteAluno(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.alunosService.deleteAluno(id);
  }
}
