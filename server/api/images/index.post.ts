import { getAllImages } from "@/lib/actions/image.actions";

export default defineEventHandler(async (event) => {
    const auth = event.context.auth;
    const { searchQuery, page, limit = 9 } = await readBody(event);



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