"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_connection_1 = require("./database.connection");
const auth_config_service_1 = require("../auth/auth-config.service");
let AuthDatabaseModule = class AuthDatabaseModule {
};
exports.AuthDatabaseModule = AuthDatabaseModule;
exports.AuthDatabaseModule = AuthDatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                useClass: database_connection_1.DatabaseConnection,
                inject: [auth_config_service_1.AuthConfigService],
            }),
        ],
        providers: [database_connection_1.DatabaseConnection, auth_config_service_1.AuthConfigService],
        exports: [mongoose_1.MongooseModule],
    })
], AuthDatabaseModule);
//# sourceMappingURL=auth-database.module.js.map