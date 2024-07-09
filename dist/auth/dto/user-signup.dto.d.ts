import { gender } from '../schema/auth.schema';
export declare class userSignUpDTO {
    readonly name: string;
    readonly phoneNumber: number;
    readonly email: string;
    readonly password: string;
    readonly Gender: gender;
}
