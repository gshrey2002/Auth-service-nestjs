// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../user/user.model';
import { JwtModule } from '@nestjs/jwt';
import { SignedUpController } from './auth.controller';
import { SignUp, signupSchema } from './schema/auth.schema';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          expire: config.get<string | number>('JWT_EXPIRE'),
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'SignUp', schema: signupSchema }]),
  ],
  controllers: [AuthController, SignedUpController],
  providers: [AuthService],
})
export class AuthModule {}
