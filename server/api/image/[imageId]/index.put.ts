import { updateImage } from "@/lib/actions/image.actions";

export default defineEventHandler(async (event) => {
    const auth = event.context.auth;

    const { image } = await readBody(event)

    const params = event.context.params;

    if (!auth?.userId) {
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        });
    };

    if (!params?.imageId) {
        return createError({
            statusCode: 505,
            statusMessage: "Image id is missing"
        });
    }

    try {
        return await updateImage({
            image,
            userId: auth?.userId,
            imageId: params.imageId
        })

    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});
