import { User, Course } from "./../graphql/user/resolvers";
import prisma from "../lib/db";

async function createCourse({
    title,
    subTitle,
    language,
    price,
    descriptions,
}: Course) {
    try {
        return await prisma.course.create({
            data: {
                title,
                subTitle,
                language,
                price,
                descriptions,
            },
        });
    } catch (error) {
        console.log(error);
        return error;
    }
}
const CourseService = { createCourse };

export default CourseService;
