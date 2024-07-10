import { Strategy } from 'passport-jwt';
import { User } from './schema/auth.schema';
import { Model } from 'mongoose';
declare const jwtStrategy_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class jwtStrategy extends jwtStrategy_base {
    private userModel;
    constructor(userModel: Model<User>);
    validate(payload: any): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
export {};
