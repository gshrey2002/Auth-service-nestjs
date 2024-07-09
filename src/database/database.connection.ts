import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { AuthConfigService } from '../auth/auth-config.service'; // Adjust path as per your setup

@Injectable()
export class DatabaseConnection implements MongooseOptionsFactory {
  constructor(private readonly authConfigService: AuthConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: 'mongodb+srv://guptashrey163:9911043878@cluster0.3n8hfgt.mongodb.net/', // Replace with your MongoDB URI
      connectionName: 'authConnection', // Optional: Specify a connection name if needed
      // Other options specific to MongooseModuleOptions
      // See https://docs.nestjs.com/techniques/mongodb for more options
    };
  }
}
