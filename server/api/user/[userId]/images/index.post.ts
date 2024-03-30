import { getUserImages } from "@/lib/actions/image.actions";

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

        return await getUserImages({
            page,
            limit,
            userId: params?.userId as string
        })


    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});