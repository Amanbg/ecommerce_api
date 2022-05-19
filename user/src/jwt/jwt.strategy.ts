import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwtPayload.interface';
import { User } from 'database';

import { UserData } from '../interfaces/userData.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<UserData> {
    const { username } = payload;

    const userData: UserData = new UserData();

    try {
      const user = await User.findOne({
        where: {
          username: username,
        },
      });

      const userDetails: User = new User();

      userDetails.id = user.id;
      userDetails.status = user.status;

      userData.user = userDetails;
    } catch (error) {
      throw new HttpException(
        'Exception while connecting with the database.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!userData)
      throw new HttpException(
        'No User exists with username : ' + username,
        HttpStatus.NOT_FOUND,
      );
    return userData;
  }
}
