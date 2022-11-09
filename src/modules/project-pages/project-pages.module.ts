import { Module } from '@nestjs/common';
import { ProjectPagesService } from './project-pages.service';
import { ProjectPagesController } from './project-pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewPage } from './entitys/page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewPage])],
  providers: [ProjectPagesService],
  controllers: [ProjectPagesController]
})
export class ProjectPagesModule {}
