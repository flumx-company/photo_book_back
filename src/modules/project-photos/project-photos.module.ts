import { Module } from '@nestjs/common';
import { ProjectPhotosService } from './project-photos.service';
import { ProjectPhotosController } from './project-photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewPhoto } from './entity/photo.entity';
import { Templates } from './entity/templates.entity';
import { NewPhotoInstance } from './entity/photo-instance.entity';
import { DefaultTemplates } from './entity/default-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewPhoto, Templates, NewPhotoInstance, DefaultTemplates])],
  providers: [ProjectPhotosService],
  controllers: [ProjectPhotosController]
})
export class ProjectPhotosModule {}
