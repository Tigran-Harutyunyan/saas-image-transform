import { getImageById } from "@/lib/actions/image.actions";

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
        return await getImageById(params?.imageId as string);

    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});