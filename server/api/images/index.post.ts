import { getAllImages } from "@/lib/actions/image.actions";

export default defineEventHandler(async (event) => {
    const auth = event.context.auth;
    const { searchQuery, page, limit = 9 } = await readBody(event);

    if (!(auth?.userId)) {
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        });
    };

    try {
        return await getAllImages({
            searchQuery,
            page,
            limit
        })

    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});