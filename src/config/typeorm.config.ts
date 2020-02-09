import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost', //quando rodando dentro do docker, o host da base de dados é 'pg'
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false, //manter a definição do script .sql
};
