import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenusModule } from './modules/menus/menus.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [MenusModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
