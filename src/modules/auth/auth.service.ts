import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {NewUser } from '../auth/entitys/new_user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRegistrationDto } from './dto/user-registrarion.dto';
import { ConfigService } from '@nestjs/config';
import { UserLoginDto } from './dto/user-login.dto';
import { Request } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
    constructor(
        private readonly config: ConfigService,
        @InjectRepository (NewUser) private readonly userRepository:Repository<NewUser>,
        private jwtService: JwtService 
    ){
        this.config = config;
    }

    async getUserById(id: number) : Promise<NewUser | string> {
      try {
        return await this.userRepository.findOne(id)
      } catch (error) {
          return error
      }
  }

    async getUserByEmail(email: string, authMethod: string) : Promise<NewUser | string> {
      try {
        return await this.userRepository.findOne({email, authMethod})
      } catch (error) {
          return error
      }
  }

    async createNewUser(user: UserRegistrationDto) : Promise<NewUser | string> {
        try {
          if (user.password) {
            const userExist = await this.userRepository.findOne({email: user.email, authMethod: user.authMethod})
            if (userExist) {
              throw new BadRequestException('user with such email is exist')
            }
            const saltRounds = Number.parseInt(this.config.get('SALT_ROUNDS')) 
            const hasedPassword = await bcrypt.hash(user.password, saltRounds)
            return await this.userRepository.save({
                ...user,
                password: hasedPassword
            })
          } else {
            return await this.userRepository.save(user)
          } 
        } catch (error) {
          return error
      }
    }

    async createNewFaceBookGoogleUser(user: UserRegistrationDto, request: Request) : Promise<object> {
    if (request.headers.authorization) {
        const jwt = request.headers.authorization.replace('Bearer ', '');
        const isUser = await admin
          .auth()
          .verifyIdToken(jwt)
          .then(() => true)
          .catch(() => false)
      if (isUser) {
        const userExist = await this.userRepository.findOne({uid: user.uid})
        if (userExist) {
          const {password, ...secureUser} = userExist
          const payload = { username: userExist.firstName, sub: userExist.id }
          const token = await this.jwtService.signAsync(payload)
          return { ...secureUser, token }

        } else {
          const newUser = await this.userRepository.save(user);
          const {password, ...secureUser} = newUser
          const payload = { username: newUser.firstName, sub: newUser.id }
          const token = await this.jwtService.signAsync(payload)
          return { ...secureUser, token }
        }
      } else {
        throw new BadRequestException('Wrong credentials')
      }
    }
  }

    async userLogin(loginUser: UserLoginDto) : Promise<object> {
        const user = await this.userRepository.findOne({email: loginUser.email, authMethod: 'email'})
          
        if(!user) {
          throw new BadRequestException('Wrong credentials, check the email or password')
        }
 
        if(!await bcrypt.compare(loginUser.password, user.password)) {
          throw new BadRequestException('Wrong credentials, check the email or password')
        }
 
        const {password, ...secureUser} = user
        const payload = { username: user.firstName, sub: user.id }
        const token = await this.jwtService.signAsync(payload)
        return {...secureUser, token}
      }

    async getAllUsers() {
      return await this.userRepository.find({
        relations: ['projects']
      })
    }

    async deleteUser(id: number) {
      return await this.userRepository.delete(id)
    }
}
