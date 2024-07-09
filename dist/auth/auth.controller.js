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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = exports.SignedUpController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const auth_service_1 = require("./auth.service");
const user_signup_dto_1 = require("./dto/user-signup.dto");
let SignedUpController = class SignedUpController {
    constructor(authService) {
        this.authService = authService;
    }
    async userFindAll() {
        return this.authService.findall();
    }
    async createUser(SignUp) {
        return this.authService.createuser(SignUp);
    }
    async findbyid(id) {
        return this.authService.findbyid(id);
    }
    async updateUser(id, SignUp) {
        return this.authService.findbyidandupdate(id, SignUp);
    }
    async deleteUser(id) {
        return this.authService.findbyidanddelete(id);
    }
};
exports.SignedUpController = SignedUpController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SignedUpController.prototype, "userFindAll", null);
__decorate([
    (0, common_1.Post)('/sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_signup_dto_1.userSignUpDTO]),
    __metadata("design:returntype", Promise)
], SignedUpController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SignedUpController.prototype, "findbyid", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_signup_dto_1.userSignUpDTO]),
    __metadata("design:returntype", Promise)
], SignedUpController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SignedUpController.prototype, "deleteUser", null);
exports.SignedUpController = SignedUpController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], SignedUpController);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async registerUser(data) {
        const user = await this.authService.registerUser(data.username, data.password);
        return {
            code: '10000',
            status: 200,
            message: 'success',
            data: { user },
        };
    }
    async loginUser(data) {
        const tokens = await this.authService.loginUser(data.username, data.password);
        if (tokens) {
            return {
                code: '10000',
                status: 200,
                message: 'success',
                data: {
                    tokens,
                },
            };
        }
        return {
            code: '10001',
            status: 401,
            message: 'Invalid credentials',
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'register' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'login' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map