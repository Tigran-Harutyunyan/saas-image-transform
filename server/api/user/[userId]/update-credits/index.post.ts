import { updateCredits } from "@/lib/actions/user.actions";

export default defineEventHandler(async (event) => {
    const auth = event.context.auth;

    const params = event.context.params;

    const { creditFee } = await readBody(event);

    if (!(auth?.userId)) {
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        });
    };

    try {

        return await updateCredits(params?.userId as string, creditFee);

    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});