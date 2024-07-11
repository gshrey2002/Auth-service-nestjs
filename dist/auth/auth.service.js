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
const auth_schema_1 = require("./schema/auth.schema");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(jwtService, UserModel) {
        this.jwtService = jwtService;
        this.UserModel = UserModel;
    }
    async signUpUser(userSignUpDTO) {
        const { name, email, password, phoneNumber, gender } = userSignUpDTO;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await this.UserModel.create({
                name,
                email,
                password: hashedPassword,
                phoneNumber,
                gender,
                role: userSignUpDTO.role,
            });
            const token = this.jwtService.sign({
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.Role,
            });
            return { token };
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Email already exists');
            }
            throw error;
        }
    }
    async loginUser(userLoginDTO) {
        const { email, password } = userLoginDTO;
        const user = await this.UserModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Email not found! Please SignUp first');
        }
        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
            throw new common_1.UnauthorizedException('Password is Incorrect! Please Retry');
        }
        const token = this.jwtService.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.Role,
        });
        return { token };
    }
    async findall() {
        const usER = await this.UserModel.find();
        return usER;
    }
    async findbyid(id) {
        const res = await this.UserModel.findById(id);
        if (!res) {
            throw new common_1.NotFoundException('book not found');
        }
        return res;
    }
    async findbyidandupdate(id, User) {
        const res = await this.UserModel.findByIdAndUpdate(id, User, {
            new: true,
            runValidators: true,
        });
        if (!res) {
            throw new common_1.NotFoundException('id not found');
        }
        return res;
    }
    async findbyidanddelete(id) {
        const res = await this.UserModel.findByIdAndDelete(id);
        if (!res) {
            throw new common_1.NotFoundException('id not found');
        }
        return res;
    }
    async validateToken(token) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
            console.log(payload.id);
            return this.UserModel.findById(payload.id);
        }
        catch (e) {
            return null;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(auth_schema_1.User.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService, mongoose.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map