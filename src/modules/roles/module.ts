import { Module } from '@nestjs/common';
import { RolesService } from './service';
import { RolesController } from './controller';
import { Role } from './entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
