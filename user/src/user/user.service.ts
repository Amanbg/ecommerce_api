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
    try {
      const sellerId = id;

      if (!sellerId) {
        throw new HttpException('Seller Id missing', HttpStatus.BAD_REQUEST);
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
    } catch (error) {
      throw error;
    }
  }

  async createOrderForSeller(sellerId, payload): Promise<any> {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async createCatalogForSeller(payload): Promise<any> {
    try {
      const data = payload;

      if (!data.userId || !data.products || data.products.length === 0) {
        throw new HttpException(
          'Catalog creation failed, missing data (userId or products)',
          HttpStatus.BAD_REQUEST,
        );
      }

      const catalog = await Catalog.findOne({
        where: {
          userId: data.userId,
        },
        attributes: ['userId'],
      });

      if (catalog.userId) {
        throw new HttpException(
          'Catalog already exists for this seller',
          HttpStatus.BAD_REQUEST,
        );
      }
      const catalogData = new Catalog(data);

      catalogData.save();

      return catalogData;
    } catch (error) {
      throw error;
    }
  }

  //TODO: get userId by token
  async getOrderReceivedBySeller(): Promise<any> {
    try {
      const user = await User.findOne({
        where: {
          id: 1,
        },
        attributes: ['id', 'type'],
      });

      if (!user) {
        throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
      }

      if (user.type !== 'seller') {
        throw new HttpException(
          'order cannot get for buyer',
          HttpStatus.BAD_REQUEST,
        );
      }

      const order = Order.findAll({
        where: {
          userId: 1,
        },
        attributes: ['catalogId', 'userId', 'products'],
      });

      return order;
    } catch (error) {
      throw error;
    }
  }
}
