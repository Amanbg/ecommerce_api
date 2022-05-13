import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';

import { Database } from 'database';
@Module({
  imports: [
    Database(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 36 * 1000,
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtStrategy],
  exports: [PassportModule],
})
export class AppModule {}
