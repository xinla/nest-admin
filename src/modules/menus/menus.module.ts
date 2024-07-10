import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';

@Module({
  controllers: [MenusController],
  providers: [MenusService]
})
export class MenusModule {}
