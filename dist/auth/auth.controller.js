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
exports.SignedUpController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_signup_dto_1 = require("./dto/user-signup.dto");
const user_create_dto_1 = require("./dto/user-create.dto");
const passport_1 = require("@nestjs/passport");
let SignedUpController = class SignedUpController {
    constructor(authService) {
        this.authService = authService;
    }
    async userFindAll() {
        return this.authService.findall();
    }
    async createUser(SignUp) {
        return this.authService.signUpUser(SignUp);
    }
    async loginUser(login) {
        return this.authService.loginUser(login);
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
    async validateToken(token) {
        const user = await this.authService.validateToken(token);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return user;
    }
    async logout(req) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            throw new common_1.UnauthorizedException('No authorization header provided');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Invalid authorization header format');
        }
        await this.authService.logout(token);
        return { message: 'Successfully logged out' };
    }
    refreshTokens(req) {
        const token = req.headers['refreshtoken'];
        if (!token) {
            throw new common_1.UnauthorizedException('No authorization header provided');
        }
        const refreshToken = token.split(' ')[1];
        return this.authService.refreshTokens(refreshToken);
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
    (0, common_1.Get)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_create_dto_1.userLoginDTO]),
    __metadata("design:returntype", Promise)
], SignedUpController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SignedUpController.prototype, "findbyid", null);
__decorate([
    (0, common_1.Put)('id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_signup_dto_1.userSignUpDTO]),
    __metadata("design:returntype", Promise)
], SignedUpController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('id/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SignedUpController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)('validate'),
    __param(0, (0, common_1.Body)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SignedUpController.prototype, "validateToken", null);
__decorate([
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SignedUpController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('refresh'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SignedUpController.prototype, "refreshTokens", null);
exports.SignedUpController = SignedUpController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], SignedUpController);
//# sourceMappingURL=auth.controller.js.map