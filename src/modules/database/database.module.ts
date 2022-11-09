
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NewUser } from '../auth/entitys/new_user.entity';
import { NewProject } from '../projects/entitys/project.entity';
import { NewPage } from '../project-pages/entitys/page.entity';
import { NewPhoto } from '../project-photos/entity/photo.entity';
import { Templates } from '../project-photos/entity/templates.entity';
import { NewPhotoInstance } from '../project-photos/entity/photo-instance.entity';
import { DefaultTemplates } from '../project-photos/entity/default-template.entity';
import { CreateTemplateSeed } from 'src/database/seeds/deafult-templates.seed';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get('DB_HOSTNAME'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [NewUser, NewProject, NewPage, NewPhoto, Templates, NewPhotoInstance, DefaultTemplates],
        seeds: [CreateTemplateSeed],
        synchronize: true,
      })
    }),
  ],
})
export class DatabaseModule {}