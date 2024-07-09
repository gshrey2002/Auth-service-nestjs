"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
const common_1 = require("@nestjs/common");
const auth_config_service_1 = require("../auth/auth-config.service");
let DatabaseConnection = class DatabaseConnection {
    constructor(authConfigService) {
        this.authConfigService = authConfigService;
    }
    createMongooseOptions() {
        return {
            uri: 'mongodb+srv://guptashrey163:9911043878@cluster0.3n8hfgt.mongodb.net/',
            connectionName: 'authConnection',
        };
    }
};
exports.DatabaseConnection = DatabaseConnection;
exports.DatabaseConnection = DatabaseConnection = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_config_service_1.AuthConfigService])
], DatabaseConnection);
//# sourceMappingURL=database.connection.js.map