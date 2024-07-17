import { User } from '../schema/auth.schema';
import mongoose from 'mongoose';
import { userLoginDTO } from '../dto/user-create.dto';
export declare class UsersService {
    private UserModel;
    constructor(UserModel: mongoose.Model<User>);
    update(email: string, updateUserDto: Partial<userLoginDTO>): Promise<User>;
    removeRefreshToken(token: string): Promise<void>;
    verifyTokenExists(token: string): Promise<void>;
}
