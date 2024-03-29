import { connectToDatabase } from "@/lib/database/mongoose";
import Image from "@/lib/database/models/image.model";

export default defineEventHandler(async (event) => {

    const { image, userId } = await readBody(event)

    const params = event.context.params;

    if (!userId) {
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        });
    };

    if (!params?.imageId) {
        return createError({
            statusCode: 505,
            statusMessage: "Image id is missing"
        });
    }

    try {

        await connectToDatabase();
        const imageToUpdate = await Image.findById(params?.imageId as string);

        if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
            throw new Error("Unauthorized or image not found");
        }

        const updatedImage = await Image.findByIdAndUpdate(
            imageToUpdate._id,
            image,
            { new: true }
        )

        return JSON.parse(JSON.stringify(updatedImage));

    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});
