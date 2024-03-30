import { getAllImages } from "@/lib/actions/image.actions";

export default defineEventHandler(async (event) => {
    const { searchQuery, page, limit = 9 } = await getQuery(event);

    try {
        return await getAllImages({
            searchQuery: searchQuery as string,
            page: Number(page),
            limit: limit as number
        })

    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});