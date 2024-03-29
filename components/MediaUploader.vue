<script setup lang="ts">
import { dataUrl, getImageSize } from "@/lib/utils";
import { toast } from "vue-sonner";

interface ImageUploadProps {
  disabled?: boolean;
  publicId: string;
  image: any;
  type: string;
}

const { publicId, image, type } = defineProps<ImageUploadProps>();

const emit = defineEmits(["upload"]);

const uploadPreset = ref("jsm-imaginify");

interface SuccessResponse {
  value: {
    event: "success";
    info: {
      secure_url: string;
      public_id: string;
      width: number;
      height: number;
    };
  };
}

interface ErrorResponse {
  value: {
    event: "error";
    error: {
      message: string;
    };
  };
}

type Response = SuccessResponse | ErrorResponse;

const handleUpload = (res: Response) => {
  if (res.value.event === "success") {
    const { public_id, secure_url, width, height } = res.value?.info;

    emit("upload", {
      publicId: public_id,
      width: width,
      height: height,
      secureURL: secure_url,
    });

    toast.success(
      "Image uploaded successfully, 1 credit was deducted from your account"
    );
  }
};
</script>

<template>
  <div
    class="space-y-4 w-full flex flex-col justify-center items-center uploader-container"
  >
    <CldUploadWidget
      v-slot="{ open }"
      :uploadPreset="uploadPreset"
      :options="{ maxFiles: 1, resourceType: 'image' }"
      @upload="handleUpload"
    >
      <div class="flex flex-col gap-4 w-full">
        <h3 class="h3-bold text-dark-600">Original</h3>
        <div
          v-if="publicId"
          class="cursor-pointer overflow-hidden rounded-[10px]"
        >
          <CldImage
            :width="getImageSize(type, image, 'width')"
            :height="getImageSize(type, image, 'height')"
            :src="publicId"
            alt="image"
            sizes="(max-width: 767px) 100vw, 50vw"
            :placeholder="dataUrl"
            class="media-uploader_cldImage"
          />
        </div>
        <div v-else class="media-uploader_cta" @click="open()">
          <div class="media-uploader_cta-image">
            <NuxtImg
              src="/assets/icons/add.svg"
              alt="Add Image"
              :width="24"
              :height="24"
            />
          </div>
          <p class="p-14-medium">Click here to upload image</p>
        </div>
      </div>
    </CldUploadWidget>
  </div>
</template>
