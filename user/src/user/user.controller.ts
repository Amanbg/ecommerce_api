import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Body,
  Post,
  UseGuards,
  Request
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('list-of-seller')
  async getSellers() {
    const sellers = await this.userService.getSellers();
    return sellers;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('seller-catalog/:id')
  async getCatalogBySeller(@Param() param) {
    const sellers = await this.userService.getCatalogBySeller(param.id);
    return sellers;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create-order/:id')
  async createOrderForSeller(@Param() param, @Body() body) {
    const createdOrder = await this.userService.createOrderForSeller(
      param.id,
      body,
    );
    return createdOrder;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create-catalog')
  async createCatalogForSeller(@Body() body) {
    const createdCatalog = await this.userService.createCatalogForSeller(body);
    return createdCatalog;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('orders')
  async getOrderReceivedBySeller(@Request() req) {
    const user = req.user;
    const orders = await this.userService.getOrderReceivedBySeller(user);
    return orders;
  }
}
