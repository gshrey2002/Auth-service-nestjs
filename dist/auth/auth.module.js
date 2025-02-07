"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./auth.controller");
const auth_schema_1 = require("./schema/auth.schema");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("./jwt.strategy");
const refreshToken_strategy_1 = require("./refreshToken.strategy");
const user_module_1 = require("./user/user.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    return {
                        secret: config.get('JWT_SECRET'),
                        expire: config.get('JWT_EXPIRE'),
                    };
                },
            }),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: auth_schema_1.UserSchema }]),
            user_module_1.UsersModule,
        ],
        controllers: [auth_controller_1.SignedUpController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.jwtStrategy, refreshToken_strategy_1.refreshToken],
        exports: [jwt_strategy_1.jwtStrategy, passport_1.PassportModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map