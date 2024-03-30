import { clerkClient } from 'h3-clerk';
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";

export default defineEventHandler(async (event) => {

    const { data, type: eventType } = await readBody(event);

    try {

        // CREATE
        if (eventType === "user.created") {
            const { id, email_addresses, image_url, first_name, last_name, username } = data;

            const user = {
                clerkId: id,
                email: email_addresses[0].email_address,
                username: username || id,
                firstName: first_name,
                lastName: last_name,
                photo: image_url,
            };

            const newUser = await createUser(user);

            // Set public metadata
            if (newUser) {
                await clerkClient.users.updateUserMetadata(id, {
                    publicMetadata: {
                        userId: newUser._id,
                    },
                });
            }

            return { message: "OK", user: newUser };
        }

        // UPDATE
        if (eventType === "user.updated") {
            const { id, image_url, first_name, last_name, username } = data;

            const user = {
                firstName: first_name,
                lastName: last_name,
                username: username || id,
                photo: image_url,
            };

            const updatedUser = await updateUser(id, user);

            return { message: "OK", user: updatedUser };
        }

        // DELETE
        if (eventType === "user.deleted") {
            const { id } = data;

            const deletedUser = await deleteUser(id!);

            return { message: "OK", user: deletedUser };
        }

    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: error?.message
        })
    }
});
