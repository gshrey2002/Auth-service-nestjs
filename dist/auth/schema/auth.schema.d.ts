export declare enum gender {
    Male = "male",
    Female = "female"
}
export declare class SignUp {
    name: string;
    phoneNumber: number;
    email: string;
    password: string;
    Gender: gender;
}
export declare const signupSchema: import("mongoose").Schema<SignUp, import("mongoose").Model<SignUp, any, any, any, import("mongoose").Document<unknown, any, SignUp> & SignUp & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SignUp, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SignUp>> & import("mongoose").FlatRecord<SignUp> & {
    _id: import("mongoose").Types.ObjectId;
}>;
