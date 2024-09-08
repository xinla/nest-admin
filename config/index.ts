import { TypeOrmModuleOptions } from '@nestjs/typeorm'
// import { BaseSubscriber } from 'src/common/entity/base'
import { SECRET } from './secret'

export const databaseList: { dev: TypeOrmModuleOptions; prod } = {
  dev: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'a1111111',
    database: 'nest',
    // entities: [],
    synchronize: true,
    // dateStrings: true, // datetime无效，timestamp有效
    autoLoadEntities: true,
    // subscribers: [BaseSubscriber],
    logging: true,
  },
  prod: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: SECRET.mysqlPassword,
    database: 'nest',
    // entities: [],
    // synchronize: true,
    autoLoadEntities: true,
  },
}

const mode = process.argv.find((e) => e.includes('env=')).split('=')[1]

export const database = databaseList[mode]
