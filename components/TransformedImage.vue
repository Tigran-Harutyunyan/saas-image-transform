<script setup lang="ts">
import { dataUrl, download, getImageSize } from "@/lib/utils";
import type { TransformedImageProps } from "@/types/index";

const emit = defineEmits(["setIsTransforming"]);

const {
  image,
  type,
  title,
  transformationConfig,
  isTransforming,
  hasDownload = false,
} = defineProps<TransformedImageProps>();

const downloadHandler = () => {
  const data = useCldImageUrl({
    options: {
      width: image?.width,
      height: image?.height,
      src: image?.publicId,
      ...transformationConfig,
    },
  });

  download(data.url, title);
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex-between">
      <h3 class="h3-bold text-dark-600">Transformed</h3>

      <button v-if="hasDownload" class="download-btn" @click="downloadHandler">
        <NuxtImg
          src="/assets/icons/download.svg"
          alt="Download"
          :width="24"
          :height="24"
          class="pb-[6px]"
        />
      </button>
    </div>

    <div class="relative" v-if="image?.publicId && transformationConfig">
      <CldImage
        :width="getImageSize(type, image, 'width')"
        :height="getImageSize(type, image, 'height')"
        :src="image?.publicId"
        :alt="image.title"
        :recolor="transformationConfig?.recolor"
        :restore="transformationConfig?.restore"
        :remove="transformationConfig?.remove"
        :removeBackground="transformationConfig?.removeBackground"
        :fillBackground="transformationConfig?.fillBackground"
        :placeholder="dataUrl"
        sizes="(max-width: 767px) 100vw, 50vw"
        class="transformed-image"
        @error="emit('setIsTransforming', false)"
        @load="emit('setIsTransforming', false)"
      />

      <div class="transforming-loader" v-if="isTransforming">
        <NuxtImg
          src="/assets/icons/spinner.svg"
          :width="50"
          :height="50"
          alt="spinner"
        />
        <p class="text-white/80">Please wait...</p>
      </div>
    </div>

    <div v-else class="transformed-placeholder">Transformed Image</div>
  </div>
</template>
