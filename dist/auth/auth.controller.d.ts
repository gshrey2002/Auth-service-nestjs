import { AuthService } from './auth.service';
import { User } from './schema/auth.schema';
import { userSignUpDTO } from './dto/user-signup.dto';
import { userLoginDTO } from './dto/user-create.dto';
export declare class SignedUpController {
    private authService;
    constructor(authService: AuthService);
    userFindAll(): Promise<User[]>;
    createUser(SignUp: userSignUpDTO): Promise<{
        token: string | any;
    }>;
    loginUser(login: userLoginDTO): Promise<{
        token: string;
    }>;
    findbyid(id: string): Promise<User>;
    updateUser(id: string, SignUp: userSignUpDTO): Promise<User>;
    deleteUser(id: string): Promise<User>;
    validateToken(token: string): Promise<User>;
}
