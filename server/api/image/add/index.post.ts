import { connectToDatabase } from "@/lib/database/mongoose";
import Image from "@/lib/database/models/image.model";

export default defineEventHandler(async (event) => {

    const { image, userId } = await readBody(event)

    if (!userId) {
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        });
    };

    try {

        await connectToDatabase();

        const newImage = await Image.create({
            ...image,
            author: userId,
        })

        return JSON.parse(JSON.stringify(newImage));

    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});
