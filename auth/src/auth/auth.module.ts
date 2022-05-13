import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt/jwt.strategy';
// import { JwtRefreshTokenStrategy } from '../jwt/jwt.refreshToken.strategy';

import { Database } from 'database';
@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: 'topSecret51',
			signOptions: {
				expiresIn: 36 * 1000,
			},
		}),
		Database(),
	],
	controllers: [AuthController],
	providers: [AuthService,JwtStrategy],
	exports: [PassportModule],
})
export class AuthModule { }
