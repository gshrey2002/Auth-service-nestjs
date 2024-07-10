export declare enum gender {
    Male = "male",
    Female = "female"
}
export declare enum role {
    Reader = "reader",
    Poster = "Poster"
}
export declare class User {
    name: string;
    phoneNumber: number;
    email: string;
    password: string;
    Gender: gender;
    Role: role;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
}>;
