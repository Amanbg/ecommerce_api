import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Op } from 'sequelize';
import { User } from 'database';
import { UserStatus } from 'src/enums/userStatus';

@Injectable()
export class AuthService {
  async register(payload) {
    const data = payload;

    const user = new User(data);

    const existingUsers = await User.findAndCountAll({
      where: {
        [Op.and]: [{ username: user.username }, { type: user.type }],
      },
    });

    data.status = UserStatus.ACTIVE;

    if (existingUsers.count > 0) {
      throw new NotAcceptableException(
        'User with this username and type already exists',
      );
    }
    await user.save();

    return user;
  }
}
