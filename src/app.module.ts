import { Dependencies, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MenusModule } from './modules/menus/menus.module'
import { UsersModule } from './modules/users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { database } from 'config'
import { AuthModule } from './modules/auth/auth.module'
import { DepstModule } from './modules/depts/depts.module'
import { RolesModule } from './modules/roles/module';

@Dependencies(DataSource)
@Module({
  imports: [TypeOrmModule.forRoot(database), MenusModule, UsersModule, AuthModule, DepstModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
