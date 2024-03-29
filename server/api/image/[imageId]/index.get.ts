import { connectToDatabase } from "@/lib/database/mongoose";
import { populateUser } from "@/lib/actions/image.actions";
import Image from "@/lib/database/models/image.model";

export default defineEventHandler(async (event) => {
    const auth = event.context.auth;
    const params = event.context.params;

    if (!(auth?.userId)) {
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        });
    };

    try {

        await connectToDatabase();

        const image = await populateUser(Image.findById(params?.imageId));

        if (!image) {
            return {
                error: true,
                message: "Image not found"
            };
        }

        return JSON.parse(JSON.stringify(image));

    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});