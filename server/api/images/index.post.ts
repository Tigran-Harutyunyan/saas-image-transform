import { connectToDatabase } from "@/lib/database/mongoose";
import { populateUser } from "@/lib/actions/image.actions";
import Image from "@/lib/database/models/image.model";
import { v2 as cloudinary } from 'cloudinary'

export default defineEventHandler(async (event) => {
    const auth = event.context.auth;
    const { searchQuery, page, limit = 9 } = await readBody(event);

    if (!(auth?.userId)) {
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        });
    };

    try {

        await connectToDatabase();

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        })

        let expression = 'folder=imaginify';

        if (searchQuery) {
            expression += ` AND ${searchQuery}`
        }

        const { resources } = await cloudinary.search
            .expression(expression)
            .execute();

        const resourceIds = resources.map((resource: any) => resource.public_id);

        let query = {};

        if (searchQuery) {
            query = {
                publicId: {
                    $in: resourceIds
                }
            }
        }

        const skipAmount = (Number(page) - 1) * limit;

        const images = await populateUser(Image.find(query))
            .sort({ updatedAt: -1 })
            .skip(skipAmount)
            .limit(limit);

        const totalImages = await Image.find(query).countDocuments();
        const savedImages = await Image.find().countDocuments();

        return {
            data: JSON.parse(JSON.stringify(images)),
            totalPage: Math.ceil(totalImages / limit),
            savedImages,
        }

    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});