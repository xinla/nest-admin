import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseList:{dev:TypeOrmModuleOptions,prod} = {
  dev: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'a1111111',
    database: 'nest',
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
  },
  prod: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'a1111111',
    database: 'nest',
    entities: [],
    // synchronize: true,
    autoLoadEntities: true,
  },
};

debugger;
const mode = process.argv;

export const database = databaseList;
