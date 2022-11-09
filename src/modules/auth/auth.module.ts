import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleStrategy } from 'src/strategies/google.strategy';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NewUser } from './entitys/new_user.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([NewUser]),
      PassportModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET_KEY'),
          signOptions: {
              expiresIn: configService.get('JWT_EXPIRATION_TIME'),
          },
        }),
        inject: [ConfigService],
      })],
    providers: [AuthService, JwtStrategy, GoogleStrategy, ConfigService],
    controllers: [AuthController],
    exports: [AuthService, JwtModule]
  })
export class AuthModule {}
