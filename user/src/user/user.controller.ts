import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('list-of-seller')
  async getSellers() {
    const sellers = await this.userService.getSellers();
    return sellers;
  }

//   @Get('seller-catalog/:id')
//   async getCatalogBySeller() {
//     const sellers = await this.userService.getCatalogBySeller();
//     return sellers;
//   }

//   @Get('create-order/:id')
//   async createOrderForSeller() {
//     const sellers = await this.userService.createOrderForSeller();
//     return sellers;
//   }
}
