import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, Catalog, Order } from 'database';

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

  async createOrderForSeller(sellerId, payload): Promise<any> {
    const user = await User.findOne({
      where: {
        id: sellerId,
      },
      attributes: ['id'],
    });

    if (!user) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }

    const order = new Order();

    const catalog = await Catalog.findOne({
      where: {
        id: sellerId,
      },
      attributes: ['id'],
    });

    order.userId = sellerId;
    order.catalogId = catalog.id;
    order.products = payload.items;

    await order.save();

    return order;
  }
}
