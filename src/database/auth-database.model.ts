import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConnection } from './database.connection'; // Adjust path as per your setup
import { AuthConfigService } from '../auth/auth-config.service'; // Adjust path as per your setup

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: DatabaseConnection,
      inject: [AuthConfigService], // Inject dependencies required by DatabaseConnection
    }),
  ],
  exports: [MongooseModule],
})
export class AuthDatabaseModule {}
