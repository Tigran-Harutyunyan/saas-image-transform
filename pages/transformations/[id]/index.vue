<script setup lang="ts">
//import TransformedImage from "@/components/shared/TransformedImage";
import { Button } from "@/components/ui/button";
// import { getImageById } from "@/lib/actions/image.actions";
// import { getImageSize } from "@/lib/utils";
// import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
const image = {};
// const image = await getImageById(id);
</script>

<template>
  <section class="mt-5 flex flex-wrap gap-4">
    <div class="p-14-medium md:p-16-medium flex gap-2">
      <p class="text-dark-600">Transformation:</p>
      <p class="capitalize text-purple-400">
        {{ image.transformationType }}
      </p>
    </div>

    <template v-if="image.prompt">
      <p class="hidden text-dark-400/50 md:block">&#x25CF;</p>
      <div class="p-14-medium md:p-16-medium flex gap-2">
        <p class="text-dark-600">Prompt:</p>
        <p class="capitalize text-purple-400">{{ image.prompt }}</p>
      </div>
    </template>

    <template v-if="image.color">
      <p class="hidden text-dark-400/50 md:block">&#x25CF;</p>
      <div class="p-14-medium md:p-16-medium flex gap-2">
        <p class="text-dark-600">Color:</p>
        <p class="capitalize text-purple-400">{{ image.color }}</p>
      </div>
    </template>

    <template v-if="image.aspectRatio">
      <p class="hidden text-dark-400/50 md:block">&#x25CF;</p>
      <div class="p-14-medium md:p-16-medium flex gap-2">
        <p class="text-dark-600">Aspect Ratio:</p>
        <p class="capitalize text-purple-400">{{ image.aspectRatio }}</p>
      </div>
    </template>
  </section>

  <section class="mt-10 border-t border-dark-400/15">
    <div class="transformation-grid">
      <!-- {/* MEDIA UPLOADER */} -->
      <div class="flex flex-col gap-4">
        <h3 class="h3-bold text-dark-600">Original</h3>

        <NuxtImg
          :width="getImageSize(image.transformationType, image, 'width')"
          :height="getImageSize(image.transformationType, image, 'height')"
          :src="image.secureURL"
          alt="image"
          class="transformation-original_image"
        />
      </div>

      <!-- {/* TRANSFORMED IMAGE */} -->
      <!-- <TransformedImage
            :image="image"
            :type="image.transformationType"
            :title="image.title"
            :isTransforming="false"
            :transformationConfig="image.config"
            :hasDownload="true"
          /> -->
    </div>

    <!-- <div class="mt-4 space-y-4" v-if="userId === image.author.clerkId">
      <Button asChild type="button" class="submit-button capitalize">
        <NuxtLink :to="/transformations/${image._id}/update">
          Update Image
        </NuxtLink>
      </Button>

        <DeleteConfirmation :imageId="image._id" />  
    </div> -->
  </section>
</template>
