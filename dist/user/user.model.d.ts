import { Document, Schema } from 'mongoose';
export interface IUser extends Document {
    username: string;
    password: string;
    comparePassword: (password: string) => boolean;
}
declare const UserSchema: Schema<IUser>;
export declare const User: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}>, any>;
export { UserSchema };
