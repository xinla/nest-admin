import { Module } from '@nestjs/common'
import { RolesService } from './service'
import { RolesController } from './controller'
import { Role } from './entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MenusModule } from '../menus/menus.module'

@Module({
  imports: [TypeOrmModule.forFeature([Role]), MenusModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
