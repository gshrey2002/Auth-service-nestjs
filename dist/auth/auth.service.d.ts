import { JwtService } from '@nestjs/jwt';
import * as mongoose from 'mongoose';
import { User } from './schema/auth.schema';
import { UsersService } from './user/user.service';
import { userSignUpDTO } from './dto/user-signup.dto';
import { userLoginDTO } from './dto/user-create.dto';
export declare class AuthService {
    private jwtService;
    private userService;
    private UserModel;
    constructor(jwtService: JwtService, userService: UsersService, UserModel: mongoose.Model<User>);
    signUpUser(userSignUpDTO: userSignUpDTO): Promise<any>;
    updateRefreshToken(email: string, refreshToken: string): Promise<void>;
    loginUser(userLoginDTO: userLoginDTO): Promise<any>;
    findall(): Promise<User[]>;
    findbyid(id: string): Promise<User>;
    findbyidandupdate(id: string, User: User): Promise<User>;
    findbyidanddelete(id: string): Promise<User>;
    validateToken(token: string): Promise<User>;
    getTokens(id: string, email: string, name: string, phoneNumber: number): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(token: string): Promise<void>;
}
