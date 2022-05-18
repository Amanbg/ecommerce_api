import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, Catalog } from 'database';

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

  async getCatalogBySeller(id): Promise<any> {
    const sellerId = id;

    if (!sellerId) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }

    const user = await User.findOne({
      where: {
        id: sellerId,
      },
      attributes: ['id'],
    });

    if (!user) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }

    const existingUsers = await Catalog.findOne({
      where: {
        userId: sellerId,
      },
      attributes: ['id', 'userId', 'products'],
    });

    return existingUsers;
  }
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
