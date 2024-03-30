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
        return await deleteImage(params?.imageId);

    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});