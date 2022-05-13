import { Injectable } from '@nestjs/common';
import { User } from 'database';

@Injectable()
export class UserService {
  async getSellers(): Promise<any> {
    const sellers = await User.findAll({
      where: {
        type: 'seller',
        status: 'ACTIVE',
      },
      attributes: ['username', 'id'],
    });

    return sellers;
  }

//   async getCatalogBySeller(payload): Promise<any> {
//     const data = payload;

//     const user = new User(data);

//     const existingUsers = await User.findAndCountAll({
//       where: {
//         [Op.and]: [{ username: user.username }, { type: user.type }],
//       },
//     });

//     data.status = UserStatus.ACTIVE;

//     if (existingUsers.count > 0) {
//       throw new NotAcceptableException(
//         'User with this username and type already exists',
//       );
//     }
//     await user.save();

//     return user;
//   }
//   async createOrderForSeller(payload): Promise<any> {
//     const data = payload;

//     const user = new User(data);

//     const existingUsers = await User.findAndCountAll({
//       where: {
//         [Op.and]: [{ username: user.username }, { type: user.type }],
//       },
//     });

//     data.status = UserStatus.ACTIVE;

//     if (existingUsers.count > 0) {
//       throw new NotAcceptableException(
//         'User with this username and type already exists',
//       );
//     }
//     await user.save();

//     return user;
//   }
}
