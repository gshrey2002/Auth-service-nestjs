import { JwtService } from '@nestjs/jwt';
import * as mongoose from 'mongoose';
import { IUser } from '../user/user.model';
import { SignUp } from './schema/auth.schema';
export declare class AuthService {
    private userModel;
    private jwtService;
    private signupModel;
    constructor(userModel: mongoose.Model<IUser>, jwtService: JwtService, signupModel: mongoose.Model<SignUp>);
    findall(): Promise<SignUp[]>;
    createuser(SignUp: SignUp): Promise<SignUp>;
    findbyid(id: string): Promise<SignUp>;
    findbyidandupdate(id: string, signup: SignUp): Promise<SignUp>;
    findbyidanddelete(id: string): Promise<SignUp>;
    registerUser(username: string, password: string): Promise<IUser>;
    loginUser(username: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
