import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ProjectPagesModule } from './modules/project-pages/project-pages.module';
import { ProjectPhotosModule } from './modules/project-photos/project-photos.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    AuthModule,
    DatabaseModule,
    ProjectsModule,
    ProjectPagesModule,
    ProjectPhotosModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
