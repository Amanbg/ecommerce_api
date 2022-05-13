import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Res,
  Body,
} from '@nestjs/common';

// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../dto/userDto.dto';
import { LoginDto } from '../dto/loginDto.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async registerUser(@Body() body: UserDto) {
    const user = await this.authService.register(body);
    return user;
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const token = await this.authService.login(body);
    return token;
  }
}
