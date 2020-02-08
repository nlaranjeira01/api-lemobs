import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Endereços')
@Controller('enderecos')
export class EnderecosController {}
