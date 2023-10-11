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
exports.resolvers = void 0;
const user_1 = __importDefault(require("./../../services/user"));
const course_1 = __importDefault(require("./../../services/course"));
//all Query resolvers
const queries = {
    getJWTToken: (parent, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield user_1.default.getJWTToken({ email, password });
        return token;
    }),
};
//all mutation resolvers
const mutations = {
    createUser: (parent, { name, email, password, contact, profileURL, role }) => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.signUpUser({
            name,
            email,
            password,
            contact,
            profileImageURL: profileURL,
            role,
        });
        return { name, email, password, profileURL, role, contact };
    }),
    createCourse: (_, { title, subTitle, language, price, descriptions }, contextValue) => __awaiter(void 0, void 0, void 0, function* () {
        if (contextValue.role == "TEACHER" || "ADMIN") {
            const course = yield course_1.default.createCourse({
                title,
                subTitle,
                language,
                price,
                descriptions,
                id: "1",
            });
            return course;
        }
        else {
            throw new Error(`your role as ${contextValue.role} is not authorzed .`);
        }
    }),
};
exports.resolvers = { queries, mutations };
