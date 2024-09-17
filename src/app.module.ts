import { Dependencies, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MenusModule } from './modules/menus/menus.module'
import { UsersModule } from './modules/users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { database } from 'config'
import { CommonModule } from './modules/common/common.module'
import { AuthModule } from './modules/auth/auth.module'
import { DepstModule } from './modules/depts/depts.module'
import { RolesModule } from './modules/roles/module'
import { NoticesModule } from './modules/notices/module'
import { SystenConfigsModule } from './modules/configs/module'
import { LoginLogsModule } from './modules/loginLogs/module'
import { GlobalModule } from './modules/global/global.module'

@Dependencies(DataSource)
@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: database }),
    MenusModule,
    UsersModule,
    CommonModule,
    AuthModule,
    DepstModule,
    RolesModule,
    NoticesModule,
    SystenConfigsModule,
    LoginLogsModule,
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
