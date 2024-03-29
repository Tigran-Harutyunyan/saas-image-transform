

import { connectToDatabase } from "@/lib/database/mongoose";
import User from "@/lib/database/models/user.model";

export default defineEventHandler(async (event) => {
    const auth = event.context.auth;

    const { userId } = event.context.params;

    const { creditFee } = await readBody(event);

    if (!(auth?.userId)) {
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        });
    };

    try {

        await connectToDatabase();

        const updatedUserCredits = await User.findOneAndUpdate(
            { _id: userId },
            { $inc: { creditBalance: creditFee } },
            { new: true }
        )

        if (!updatedUserCredits) throw new Error("User credits update failed");

        return JSON.parse(JSON.stringify(updatedUserCredits));

    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});