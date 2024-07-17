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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_schema_1 = require("../schema/auth.schema");
const mongoose_2 = require("mongoose");
let UsersService = class UsersService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async update(email, updateUserDto) {
        return this.UserModel.findOneAndUpdate({ email }, { $set: updateUserDto }, { new: true }).exec();
    }
    async removeRefreshToken(token) {
        await this.verifyTokenExists(token);
        try {
            const result = await this.UserModel.updateOne({ refreshToken: token }, { $unset: { refreshToken: '' } }).exec();
            if (result.matchedCount === 0) {
                console.log('No user found with the given refreshToken.');
            }
            else {
                console.log('Refresh token removed successfully. Update result:', result);
            }
        }
        catch (error) {
            console.error('Error in removeRefreshToken:', error);
            throw error;
        }
    }
    async verifyTokenExists(token) {
        const user = await this.UserModel.findOne({ refreshToken: token }).exec();
        if (user) {
            console.log('User with refreshToken found:', user);
        }
        else {
            console.log('No user found with the given refreshToken.');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], UsersService);
//# sourceMappingURL=user.service.js.map