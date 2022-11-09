import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewProject } from './entitys/project.entity';
import { NewPage } from '../project-pages/entitys/page.entity';
import { ProjectPagesService } from '../project-pages/project-pages.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewProject, NewPage])],
  providers: [ProjectsService, ProjectPagesService],
  controllers: [ProjectsController],
  exports: [ProjectsService]
})
export class ProjectsModule {}
