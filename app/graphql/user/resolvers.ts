import UserService from "./../../services/user";
import { Role } from "@prisma/client";
import CourseService from "./../../services/course";

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    contact: number;
    profileURL: string;
    role: Role;
    token: string;
};

export type Course = {
    id: string;
    title: string;
    subTitle: string;
    language: string;
    price: number;
    descriptions: string;
};

//all Query resolvers
const queries = {
    getJWTToken: async (parent: any, { email, password }: User) => {
        const token = await UserService.getJWTToken({ email, password });
        return token;
    },
};

//all mutation resolvers
const mutations = {
    createUser: async (
        parent: any,
        { name, email, password, contact, profileURL, role }: User
    ) => {
        await UserService.signUpUser({
            name,
            email,
            password,
            contact,
            profileImageURL: profileURL,
            role,
        });

        return { name, email, password, profileURL, role, contact };
    },

    createCourse: async (
        _: any,
        { title, subTitle, language, price, descriptions }: Course,
        contextValue: any
    ) => {
        if (contextValue.role == "TEACHER" || "ADMIN") {
            const course = await CourseService.createCourse({
                title,
                subTitle,
                language,
                price,
                descriptions,
                id: "1",
            });

            return course;
        } else {
            throw new Error(
                `your role as ${contextValue.role} is not authorzed .`
            );
        }
    },
};
export const resolvers = { queries, mutations };
