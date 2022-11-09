import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get<ConfigService>(ConfigService);
  const adminConfig: ServiceAccount = {
    "projectId": configService.get<string>('FIREBASE_PROJECT_ID'),
    "privateKey": configService.get<string>('FIREBASE_PRIVATE_KEY')
                               .replace(/\\n/g, '\n'),
    "clientEmail": configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig)
  });
  const config = new DocumentBuilder()
  .setTitle('photo_book docs')
  .setDescription('photo_book api info')
  .setVersion('1.0')
  .addTag('authorization/login')
  .addTag('projects')
  .addTag('pages')
  .addTag('photos')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('swagger', app, document);
  await app.listen(configService.get('PORT'));
}
bootstrap();
