import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";
import prisma from "../lib/db";
import { Role } from "@prisma/client";

const JWT_SECRET = "$uperM@n@123";

export interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
    contact?: number;
    role: Role;
    profileImageURL?: string;
}

export interface GetUserTokenPayload {
    email: string;
    password: string;
}

//1: It generates hashed password with given salt and raw password
function generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex");
    return hashedPassword;
}

//2: It returns a user from DB by email
async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
}

//3: decodes the jwt token
async function decodeJWTToken(token: string) {
    return JWT.verify(token, JWT_SECRET);
}

//4: It signup/ creates new User in DB
async function signUpUser(payload: CreateUserPayload) {
    const { password } = payload;

    const salt = randomBytes(32).toString("hex");
    const hashedPassword = generateHash(salt, password);

    return await prisma.user.create({
        data: {
            ...payload,
            salt,
            password: hashedPassword,
        },
    });
}

//5: It Log's In the user
async function getJWTToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await getUserByEmail(email);
    if (!user) throw new Error("user not found");

    const userSalt = user.salt;
    const usersHashPassword = generateHash(userSalt, password);

    if (usersHashPassword !== user.password)
        throw new Error("Incorrect Password");

    // Gen Token
    const token = JWT.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET
    );
    return token;
}

const UserService = { getJWTToken, signUpUser, decodeJWTToken };
export default UserService;
