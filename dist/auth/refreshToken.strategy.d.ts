import { Strategy } from 'passport-jwt';
import { Request } from 'express';
declare const refreshToken_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class refreshToken extends refreshToken_base {
    constructor();
    validate(req: Request, payload: any): any;
}
export {};
