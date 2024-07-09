"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
exports.UserSchema = UserSchema;
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const salt = await bcrypt_1.default.genSalt(10);
    const hash = await bcrypt_1.default.hash(this.password, salt);
    this.password = hash;
    next();
});
UserSchema.methods.comparePassword = function (password) {
    return bcrypt_1.default.compareSync(password, this.password);
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=user.model.js.map