import { SequelizeModule } from '@nestjs/sequelize';

import { User } from "../schemas/user.schema";

import {DynamicModule} from '@nestjs/common';
import { config } from "dotenv";

export function Database(): DynamicModule {
    config();
  
    return SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PGSQL_HOST,
      port: parseInt(process.env.PGSQL_PORT),
      username: process.env.PGSQL_USERNAME,
      password: process.env.PGSQL_PASSWORD,
      database: process.env.PGSQL_DATABASE,
      models: [User],
    });
  }
