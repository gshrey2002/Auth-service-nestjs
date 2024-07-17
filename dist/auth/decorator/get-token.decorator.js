"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetToken = void 0;
const common_1 = require("@nestjs/common");
exports.GetToken = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }
    return null;
});
//# sourceMappingURL=get-token.decorator.js.map