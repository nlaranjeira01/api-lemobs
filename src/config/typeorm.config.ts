import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
