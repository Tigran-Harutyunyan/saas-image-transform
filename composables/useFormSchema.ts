import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { type AspectRatioKey } from "@/lib/utils";
import {
    aspectRatioOptions,
} from "@/constants";
export function useFormSchema(type: string, prompt: string) {
    const formSchema = toTypedSchema(
        z.object({
            title: z.string().min(1, {
                message: "Title is required.",
            }),
            aspectRatio: z
                .string()
                .optional()
                .refine((value) => {
                    if (value && !aspectRatioOptions[value as AspectRatioKey]) {
                        return new Error("Invalid aspect ratio.");
                    }
                    return true;
                }),
            color:
                type === "recolor"
                    ? z.string().min(1, {
                        message: "Color is required.",
                    })
                    : z.string().optional(),
            prompt:
                (type === "recolor" || type === "remove") &&
                    prompt
                    ? z.string().min(1, {
                        message: "Prompt is required.",
                    })
                    : z.string().optional(),
            publicId: z.string().min(1, {
                message: "Image is required.",
            }),
        })
    );
    return {
        formSchema
    };
}
