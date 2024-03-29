<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useDebounceFn } from "@vueuse/core";
import { type TransformationTypeKey } from "@/types";

import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import type { TransformationFormProps, Transformations } from "@/types/index";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  aspectRatioOptions,
  creditFee,
  defaultValues,
  transformationTypes,
} from "@/constants";

import { type AspectRatioKey, deepMergeObjects } from "@/lib/utils";

const {
  action,
  data = null,
  userId,
  type,
  creditBalance,
  config = null,
} = defineProps<TransformationFormProps>();

const transformationType = transformationTypes[type];
const image = ref(data);
const newTransformation = ref<Transformations | null>(null);
const isSubmitting = ref(false);
const isTransforming = ref(false);
const transformationConfig = ref(config);
const isLoading = ref(false);
const initialValues =
  data && action === "Update"
    ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId,
      }
    : defaultValues;

if (data && data.config) {
  transformationConfig.value = data.config;
}
const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, {
      message: "Title is required.",
    }),
    aspectRatio: z.string().optional(),
    color:
      type === "recolor"
        ? z.string().min(1, {
            message: "Color is required.",
          })
        : z.string().optional(),
    prompt:
      type === "recolor" || type === "remove"
        ? z.string().min(1, {
            message: "Prompt is required.",
          })
        : z.string().optional(),
    publicId: z.string().min(1, {
      message: "Image is required.",
    }),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues,
});

const onSubmit = form.handleSubmit(async (values) => {
  isSubmitting.value = true;

  if (data || image.value) {
    const { url: transformationUrl } = useCldImageUrl({
      options: {
        width: image.value?.width,
        height: image.value?.height,
        src: image.value?.publicId as string,
        ...transformationConfig.value,
      },
    });

    const imageData = {
      title: values.title,
      publicId: image.value?.publicId,
      transformationType: type,
      width: image.value?.width,
      height: image.value?.height,
      config: transformationConfig.value,
      secureURL: image.value?.secureURL,
      transformationURL: transformationUrl,
      aspectRatio: values.aspectRatio,
      prompt: values.prompt,
      color: values.color,
    };

    if (action === "Add") {
      try {
        const newImage = await $fetch("/api/image/add", {
          method: "post",
          body: {
            image: imageData,
            userId,
            path: "/",
          },
        });

        if (newImage) {
          toast.success("Image create success");
          form.resetForm();
          image.value = newImage;
          navigateTo(`/transformations/${newImage._id}`);
        }
      } catch (error) {
        toast.error(error?.message);
      } finally {
        isSubmitting.value = false;
      }
    }

    if (action === "Update") {
      try {
        const route = useRoute();

        const imageId = route.params?.imageId as string;

        const updatedImage = await $fetch(`/api/image/${imageId}`, {
          method: "put",
          body: {
            image: imageData,
            userId,
            path: "/",
          },
        });

        if (updatedImage) {
          toast.success("Image update success");
          navigateTo(`/transformations/${updatedImage._id}`);
        }
      } catch (error) {
        toast.error(error?.message);
      } finally {
        isSubmitting.value = false;
      }
    }
  }

  isSubmitting.value = false;
});

const onMediaUpload = (data) => {
  image.value = {
    ...toRaw(image.value),
    ...data,
  };
  form.setFieldValue("publicId", data?.publicId);
};

const onTransformHandler = async () => {
  isTransforming.value = true;

  const merged = deepMergeObjects(
    newTransformation.value,
    transformationConfig.value
  );

  transformationConfig.value = toRaw(merged);

  newTransformation.value = null;

  await $fetch(`/api/user/${userId}/update-credits`, {
    method: "POST",
    body: {
      creditFee,
    },
  });
};

const onInputChange = useDebounceFn(
  (fieldName: string, type: TransformationTypeKey) => {
    if (newTransformation.value === null) {
      newTransformation.value = {};
    }

    if (fieldName === "title") return;

    newTransformation.value = {
      ...toRaw(newTransformation.value),
      [type]: {
        ...newTransformation.value[type],
        [fieldName === "prompt" ? "prompt" : "to"]: form.values[fieldName],
      },
    };
  }
);

const onSelectFieldHandler = () => {
  const imageSize =
    aspectRatioOptions[form.values["aspectRatio"] as AspectRatioKey];

  image.value = {
    ...toRaw(image.value),
    aspectRatio: imageSize.aspectRatio,
    width: imageSize.width,
    height: imageSize.height,
  };

  newTransformation.value = transformationType.config;
};

const transformBtnDisabled = computed(() => {
  if (isTransforming.value) return true;
  if (!newTransformation.value) return true;
  if (type === "recolor" && !form.values.color) return true;
  return false;
});

watch(
  () => image.value,
  () => {
    if (image.value && (type === "restore" || type === "removeBackground")) {
      newTransformation.value = transformationType.config;
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <form @submit.prevent.stop="onSubmit" class="space-y-8">
    <InsufficientCreditsModal v-if="creditBalance < Math.abs(creditFee)" />

    <FormField name="title" v-slot="{ componentField }">
      <FormItem class="col-span-2 md:col-span-1">
        <FormLabel>Image Title</FormLabel>
        <FormControl>
          <Input
            :disabled="isLoading"
            v-bind="componentField"
            class="w-full input-field"
            @update:model-value="onInputChange('title', type)"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-if="type === 'fill'"
      name="aspectRatio"
      v-slot="{ componentField }"
    >
      <FormItem class="col-span-2 md:col-span-1">
        <FormLabel>Aspect Ratio</FormLabel>
        <FormControl>
          <Select
            :disabled="isLoading"
            v-bind="componentField"
            @update:model-value="onSelectFieldHandler()"
          >
            <FormControl>
              <SelectTrigger class="select-field">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectItem
                v-for="key in Object.keys(aspectRatioOptions)"
                :key="key"
                :value="key"
                class="select-item"
              >
                {{ aspectRatioOptions[key as AspectRatioKey].label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="prompt-field" v-if="type === 'remove' || type === 'recolor'">
      <FormField name="prompt" v-slot="{ componentField }">
        <FormItem class="col-span-2 md:col-span-1 w-full">
          <FormLabel>{{
            type === "remove" ? "Object to remove" : "Object to recolor"
          }}</FormLabel>
          <FormControl>
            <Input
              :disabled="isLoading"
              v-bind="componentField"
              @update:model-value="onInputChange('prompt', type)"
              class="w-full input-field"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-if="type === 'recolor'"
        name="color"
        v-slot="{ componentField }"
      >
        <FormItem class="col-span-2 md:col-span-1">
          <FormLabel>Replacement Color</FormLabel>
          <FormControl>
            <Input
              :disabled="isLoading"
              v-bind="componentField"
              @update:model-value="onInputChange('color', type)"
              class="w-full input-field"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="media-uploader-field">
      <FormField
        name="publicId"
        class="flex size-full flex-col"
        v-slot="{ componentField }"
      >
        <FormItem class="col-span-2 md:col-span-1">
          <FormLabel></FormLabel>
          <FormControl>
            <MediaUploader
              @upload="onMediaUpload"
              :publicId="componentField.modelValue"
              :image="image"
              :type="type"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <ClientOnly>
        <TransformedImage
          :image="image"
          :type="type"
          :title="form.values?.title"
          :isTransforming="isTransforming"
          @setIsTransforming="isTransforming = false"
          :transformationConfig="transformationConfig"
        />
      </ClientOnly>
    </div>
    <div class="flex flex-col gap-4">
      <Button
        type="button"
        class="submit-button capitalize"
        :disabled="transformBtnDisabled"
        @click="onTransformHandler"
      >
        {{ isTransforming ? "Transforming..." : "Apply Transformation" }}
      </Button>
      <Button
        type="submit"
        class="submit-button capitalize"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? "Submitting..." : "Save Image" }}
      </Button>
    </div>
  </form>
</template>
