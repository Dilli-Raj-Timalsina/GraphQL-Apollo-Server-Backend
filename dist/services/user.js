"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../lib/db"));
const JWT_SECRET = "$uperM@n@123";
//1: It generates hashed password with given salt and raw password
function generateHash(salt, password) {
    const hashedPassword = (0, node_crypto_1.createHmac)("sha256", salt)
        .update(password)
        .digest("hex");
    return hashedPassword;
}
//2: It returns a user from DB by email
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.default.user.findUnique({ where: { email } });
    });
}
//3: decodes the jwt token
function decodeJWTToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    });
}
//4: It signup/ creates new User in DB
function signUpUser(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password } = payload;
        const salt = (0, node_crypto_1.randomBytes)(32).toString("hex");
        const hashedPassword = generateHash(salt, password);
        return yield db_1.default.user.create({
            data: Object.assign(Object.assign({}, payload), { salt, password: hashedPassword }),
        });
    });
}
//5: It Log's In the user
function getJWTToken(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = payload;
        const user = yield getUserByEmail(email);
        if (!user)
            throw new Error("user not found");
        const userSalt = user.salt;
        const usersHashPassword = generateHash(userSalt, password);
        if (usersHashPassword !== user.password)
            throw new Error("Incorrect Password");
        // Gen Token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);
        return token;
    });
}
const UserService = { getJWTToken, signUpUser, decodeJWTToken };
exports.default = UserService;
