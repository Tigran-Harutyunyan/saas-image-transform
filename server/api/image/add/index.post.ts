import { addImage } from "@/lib/actions/image.actions";

export default defineEventHandler(async (event) => {

    const { image, userId } = await readBody(event)

    if (!userId) {
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        });
    };

    try {
        return await addImage({
            image,
            userId,
        })

    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});
