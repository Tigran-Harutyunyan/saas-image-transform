import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";

export default defineEventHandler(async (event) => {
    const auth = event.context.auth;
    const { page, limit = 9 } = await readBody(event);

    if (!(auth?.userId)) {
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        });
    };


    try {

        const user = await getUserById(auth.userId);

        if (!user._id) {
            return createError({
                statusCode: 401,
                statusMessage: "Unauthorized"
            });
        }

        return await getUserImages({
            page,
            limit,
            userId: user._id as string
        })


    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});