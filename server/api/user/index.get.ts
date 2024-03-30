import { getUserById } from "@/lib/actions/user.actions";

export default defineEventHandler(async (event) => {

    const auth = event.context.auth;

    if (!(auth?.userId)) {
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        });
    }

    try {
        return await getUserById(auth.userId);

    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});
