import { connectToDatabase } from "@/lib/database/mongoose";
import User from "@/lib/database/models/user.model";

export default defineEventHandler(async (event) => {

    const auth = event.context.auth;

    if (!(auth?.userId)) return;

    try {

        await connectToDatabase();

        const user = await User.findOne({ clerkId: auth.userId });

        if (!user) throw new Error("User not found");

        return JSON.parse(JSON.stringify(user));

    } catch (error) {
        console.log(error)
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});
