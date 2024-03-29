import { connectToDatabase } from "@/lib/database/mongoose";
import { populateUser } from "@/lib/actions/image.actions";
import Image from "@/lib/database/models/image.model";

export default defineEventHandler(async (event) => {
    const auth = event.context.auth;
    const params = event.context.params;
    const { page, limit = 9 } = await readBody(event);

    if (!(auth?.userId)) {
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        });
    };

    try {

        await connectToDatabase();

        const skipAmount = (Number(page) - 1) * limit;

        const images = await populateUser(Image.find({ author: params?.userId }))
            .sort({ updatedAt: -1 })
            .skip(skipAmount)
            .limit(limit);

        const totalImages = await Image.find({ author: params?.userId }).countDocuments();

        return {
            data: JSON.parse(JSON.stringify(images)),
            totalPages: Math.ceil(totalImages / limit),
        };

    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});