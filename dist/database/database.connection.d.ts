import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { AuthConfigService } from '../auth/auth-config.service';
export declare class DatabaseConnection implements MongooseOptionsFactory {
    private readonly authConfigService;
    constructor(authConfigService: AuthConfigService);
    createMongooseOptions(): MongooseModuleOptions;
}
