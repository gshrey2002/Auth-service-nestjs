import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConnection } from './database.connection'; // Adjust path as necessary
import { AuthConfigService } from '../auth/auth-config.service'; // Adjust path as necessary

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: DatabaseConnection,
      inject: [AuthConfigService], // Inject dependencies required by DatabaseConnection
    }),
  ],
  providers: [DatabaseConnection, AuthConfigService], // Ensure providers are listed here
  exports: [MongooseModule],
})
export class AuthDatabaseModule {}
