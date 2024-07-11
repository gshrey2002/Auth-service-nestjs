import { JwtService } from '@nestjs/jwt';
import * as mongoose from 'mongoose';
import { User } from './schema/auth.schema';
export declare class AuthService {
    private jwtService;
    private UserModel;
    constructor(jwtService: JwtService, UserModel: mongoose.Model<User>);
    signUpUser(userSignUpDTO: any): Promise<{
        token: string;
    }>;
    loginUser(userLoginDTO: any): Promise<{
        token: string;
    }>;
    findall(): Promise<User[]>;
    findbyid(id: string): Promise<User>;
    findbyidandupdate(id: string, User: User): Promise<User>;
    findbyidanddelete(id: string): Promise<User>;
    validateToken(token: string): Promise<User>;
}
