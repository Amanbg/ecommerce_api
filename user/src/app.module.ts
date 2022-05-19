import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Database } from '../database';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    Database(),
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, JwtStrategy],
  exports: [PassportModule],
})
export class AppModule {}
