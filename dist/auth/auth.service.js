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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_model_1 = require("../user/user.model");
const auth_schema_1 = require("./schema/auth.schema");
let AuthService = class AuthService {
    constructor(userModel, jwtService, signupModel) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.signupModel = signupModel;
    }
    async findall() {
        const usER = await this.signupModel.find();
        return usER;
    }
    async createuser(SignUp) {
        const res = await this.signupModel.create(SignUp);
        return res;
    }
    async findbyid(id) {
        const res = await this.signupModel.findById(id);
        if (!res) {
            throw new common_1.NotFoundException('book not found');
        }
        return res;
    }
    async findbyidandupdate(id, signup) {
        const res = await this.signupModel.findByIdAndUpdate(id, signup, {
            new: true,
            runValidators: true,
        });
        if (!res) {
            throw new common_1.NotFoundException('id not found');
        }
        return res;
    }
    async findbyidanddelete(id) {
        const res = await this.signupModel.findByIdAndDelete(id);
        if (!res) {
            throw new common_1.NotFoundException('id not found');
        }
        return res;
    }
    async registerUser(username, password) {
        const user = new this.userModel({ username, password });
        return user.save();
    }
    async loginUser(username, password) {
        const user = await this.userModel.findOne({ username });
        if (user && user.comparePassword(password)) {
            const payload = { username: user.username, sub: user._id };
            const accessToken = this.jwtService.sign(payload, { expiresIn: '60m' });
            const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
            return { accessToken, refreshToken };
        }
        return null;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(auth_schema_1.SignUp.name)),
    __metadata("design:paramtypes", [mongoose.Model, jwt_1.JwtService, mongoose.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map