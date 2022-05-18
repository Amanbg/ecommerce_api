import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Body,
  Post,
} from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('list-of-seller')
  async getSellers() {
    const sellers = await this.userService.getSellers();
    return sellers;
  }

  @Get('seller-catalog/:id')
  async getCatalogBySeller(@Param() param) {
    const sellers = await this.userService.getCatalogBySeller(param.id);
    return sellers;
  }

  @Post('create-order/:id')
  async createOrderForSeller(@Param() param, @Body() body) {
    const createdOrder = await this.userService.createOrderForSeller(
      param.id,
      body,
    );
    return createdOrder;
  }

  @Post('create-catalog')
  async createCatalogForSeller(@Body() body) {
    const createdCatalog = await this.userService.createCatalogForSeller(body);
    return createdCatalog;
  }
  @Get('orders')
  async getOrderReceivedBySeller() {
    const orders = await this.userService.getOrderReceivedBySeller();
    return orders;
  }
}
