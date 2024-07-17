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
const user_service_1 = require("./user/user.service");
let AuthService = class AuthService {
    constructor(jwtService, userService, UserModel) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.UserModel = UserModel;
    }
    async signUpUser(userSignUpDTO) {
        const { name, email, password, phoneNumber } = userSignUpDTO;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const usersss = await this.UserModel.create({
                ...userSignUpDTO,
                password: hashedPassword,
            });
            const tokens = await this.getTokens(usersss.email, usersss._id.toString(), usersss.email, usersss.phoneNumber);
            await this.updateRefreshToken(usersss.email, tokens.refreshToken);
            return tokens;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Email already exists');
            }
            throw error;
        }
    }
    async updateRefreshToken(email, refreshToken) {
        const updateUserDto = {
            refreshToken: refreshToken,
        };
        await this.userService.update(email, updateUserDto);
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
        const tokens = await this.getTokens(user._id.toString(), user.name, user.email, user.phoneNumber);
        await this.updateRefreshToken(user.email, tokens.refreshToken);
        return tokens;
    }
    async findall() {
        const usER = await this.UserModel.find();
        return usER;
    }
    async findbyid(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid Id format');
        }
        const res = await this.UserModel.findById(id);
        if (!res) {
            throw new common_1.NotFoundException('user not found');
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
            return this.UserModel.findById(payload.id);
        }
        catch (e) {
            return null;
        }
    }
    async getTokens(id, email, name, phoneNumber) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                name,
                id,
                email,
                phoneNumber,
            }, {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '10m',
            }),
            this.jwtService.signAsync({
                name,
                id,
                email,
                phoneNumber,
            }, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async logout(token) {
        try {
            await this.userService.removeRefreshToken(token);
        }
        catch (error) {
            console.error('Error during logout:', error);
            return null;
        }
    }
    extractUserIdFromToken(token) {
        const decodedToken = this.jwtService.decode(token);
        return decodedToken?.id;
    }
    async refreshTokens(refreshToken) {
        await this.userService.verifyTokenExists(refreshToken);
        const userId = this.extractUserIdFromToken(refreshToken);
        const user = await this.findbyid(userId);
        if (!user || !user.refreshToken)
            throw new common_1.ForbiddenException('Access Denied 1');
        const refreshTokenMatches = user.refreshToken === refreshToken;
        if (!refreshTokenMatches)
            throw new common_1.ForbiddenException('Access Denied 2');
        const tokens = await this.getTokens(userId, user.name, user.email, user.phoneNumber);
        await this.updateRefreshToken(user.email, tokens.refreshToken);
        return tokens;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(auth_schema_1.User.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UsersService, mongoose.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map