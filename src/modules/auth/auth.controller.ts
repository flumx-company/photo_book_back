import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegistrationDto } from './dto/user-registrarion.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        ) {}

    @Post('register')
    async register(
        @Body() registerUser: UserRegistrationDto
    ) {
        return await this.authService.createNewUser(registerUser)
    }

    @Post('register-google-facebook')
    async facebookGoogleRegister(
        @Body() registerUser: UserRegistrationDto,
        @Req() req
    ) {
        return await this.authService.createNewFaceBookGoogleUser(registerUser, req)
    }

    @Post('login')
    async login(
      @Body() userLogin: UserLoginDto
    ) {
        return await this.authService.userLogin(userLogin)
    }

    @Get('all')
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    getAllUsers() {
      return this.authService.getAllUsers()
    }

    @Delete('user/:id')
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    deleteUser(
        @Param('id') id: number
    ) {
        return this.authService.deleteUser(id)
    }

}
