import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { AuthConfig as AuthConfigInterface } from './auth-config.interface';
export declare class AuthConfigService implements MongooseOptionsFactory, AuthConfigInterface {
    jwtSecret: string;
    jwtExpirationTime: string;
    bcryptSaltOrRound: number | string;
    refreshTokenExpirationTime: string;
    accessTokenExpirationTime: string;
    createMongooseOptions(): MongooseModuleOptions;
}
