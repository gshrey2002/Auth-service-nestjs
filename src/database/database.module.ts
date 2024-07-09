import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthConfigService } from '../auth/auth-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: AuthConfigService,
    }),
  ],
  exports: [MongooseModule],
})
export class AuthDatabaseModule {}
