import { Module } from '@nestjs/common'
import { MenusService } from './menus.service'
import { MenusController } from './menus.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Menu } from './menu.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [MenusController],
  providers: [MenusService],
  exports: [MenusService],
})
export class MenusModule {}
