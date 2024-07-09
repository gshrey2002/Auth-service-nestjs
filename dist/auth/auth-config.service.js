"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthConfigService = void 0;
const common_1 = require("@nestjs/common");
let AuthConfigService = class AuthConfigService {
    constructor() {
        this.jwtSecret = 'your_jwt_secret';
        this.jwtExpirationTime = '1h';
        this.bcryptSaltOrRound = 10;
        this.refreshTokenExpirationTime = '7d';
        this.accessTokenExpirationTime = '15m';
    }
    createMongooseOptions() {
        return {
            uri: 'mongodb://localhost:27017/authdb',
            connectionName: 'authConnection',
        };
    }
};
exports.AuthConfigService = AuthConfigService;
exports.AuthConfigService = AuthConfigService = __decorate([
    (0, common_1.Injectable)()
], AuthConfigService);
//# sourceMappingURL=auth-config.service.js.map