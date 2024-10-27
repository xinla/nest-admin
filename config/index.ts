import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import dayjs from 'dayjs'
// import { BaseSubscriber } from 'src/common/entity/base'
// import { secret } from './secret'
import { accessSync, constants } from 'fs'

export const config = {
  adminKey: 'admin',
  isPublicKey: 'isPublic',
  get jwtExpires() {
    return dayjs().endOf('day').diff(dayjs(), 'second') + 's'
  }, // 到当天结束过期
  // jwtExpires: '1d',
  jwtSecret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
}

export const databaseList: { dev: TypeOrmModuleOptions; prod } = {
  dev: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'a1111111',
    database: 'nest_admin',
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
    database: 'nest_admin',
    synchronize: true,
    autoLoadEntities: true,
  },
}

const mode = process.argv.find((e) => e.includes('env=')).split('=')[1]

export const database = async () => {
  if (mode == 'prod') {
    try {
      // accessSync('config/secret.ts', constants.F_OK)
      const { secret } = await import(`./${'secret'}.js`)
      databaseList[mode].password = secret.mysqlPassword
    } catch (err) {
      // console.error('no access!')
    }
  }
  return databaseList[mode]
}
