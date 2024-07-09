import { AuthService } from './auth.service';
import { SignUp } from './schema/auth.schema';
import { userSignUpDTO } from './dto/user-signup.dto';
export declare class SignedUpController {
    private authService;
    constructor(authService: AuthService);
    userFindAll(): Promise<SignUp[]>;
    createUser(SignUp: userSignUpDTO): Promise<SignUp>;
    findbyid(id: string): Promise<SignUp>;
    updateUser(id: string, SignUp: userSignUpDTO): Promise<SignUp>;
    deleteUser(id: string): Promise<SignUp>;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(data: any): Promise<{
        code: string;
        status: number;
        message: string;
        data: {
            user: import("../user/user.model").IUser;
        };
    }>;
    loginUser(data: any): Promise<{
        code: string;
        status: number;
        message: string;
        data: {
            tokens: {
                accessToken: string;
                refreshToken: string;
            };
        };
    } | {
        code: string;
        status: number;
        message: string;
        data?: undefined;
    }>;
}
