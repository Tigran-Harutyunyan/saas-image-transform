<script setup lang="ts">
import { type IImage } from "@/lib/database/models/image.model";
import { transformationTypes } from "@/constants";

const { image } = defineProps<{ image: IImage }>();
</script>

<template>
  <li>
    <NuxtLink :to="`/transformations/${image._id}`" class="collection-card">
      <CldImage
        :src="image.publicId"
        :alt="image.title"
        :width="image?.width"
        :height="image?.height"
        loading="lazy"
        class="h-52 w-full rounded-[10px] object-cover"
        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
      />
      <div class="flex-between">
        <p class="p-20-semibold mr-3 line-clamp-1 text-dark-600">
          {{ image.title }}
        </p>
        <NuxtImg
          :src="`/assets/icons/${
            transformationTypes[image.transformationType].icon
          }`"
          :alt="image.title"
          :width="24"
          :height="24"
        />
      </div>
    </NuxtLink>
  </li>
</template>
