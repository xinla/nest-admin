import { TypeOrmModuleOptions } from '@nestjs/typeorm'
// import { BaseSubscriber } from 'src/common/entity/base'
// import { secret } from './secret'
import { accessSync, constants } from 'fs'

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
    password: 'your password',
    database: 'nest',
    // entities: [],
    // synchronize: true,
    autoLoadEntities: true,
  },
}

const mode = process.argv.find((e) => e.includes('env=')).split('=')[1]

export const database = async () => {
  try {
    accessSync('config/secret.ts', constants.F_OK)
    if (mode !== 'prod') return databaseList[mode]
    let module = await import(`./${'secret'}.js`)
    const { secret } = module
    databaseList[mode].password = secret.mysqlPassword
  } catch (err) {
    console.error('no access!')
  }
  return databaseList[mode]
}
