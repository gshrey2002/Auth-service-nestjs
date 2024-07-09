import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { AuthConfig as AuthConfigInterface } from './auth-config.interface'; // Adjust path as necessary

@Injectable()
export class AuthConfigService
  implements MongooseOptionsFactory, AuthConfigInterface
{
  jwtSecret: string = 'your_jwt_secret';
  jwtExpirationTime: string = '1h';
  bcryptSaltOrRound: number | string = 10;
  refreshTokenExpirationTime: string = '7d';
  accessTokenExpirationTime: string = '15m';

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: 'mongodb://localhost:27017/authdb', // Replace with your MongoDB URI
      connectionName: 'authConnection', // Optional: Specify a connection name if needed
      // Other options specific to MongooseModuleOptions
      // See https://docs.nestjs.com/techniques/mongodb for more options
    };
  }
}
