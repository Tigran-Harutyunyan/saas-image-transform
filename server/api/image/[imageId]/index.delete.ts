import { connectToDatabase } from "@/lib/database/mongoose";
import { deleteImage } from "@/lib/actions/image.actions";

export default defineEventHandler(async (event) => {

    const auth = event.context.auth;
    const params = event.context.params;

    if (!(auth?.userId)) {
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        });
    };

    if (!params?.imageId) {
        throw new Error("Image ID is missing")
    }

    try {

        await connectToDatabase();

        const response = await deleteImage(params?.imageId);

        return response;

    } catch (error) {
        console.log(error)
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});