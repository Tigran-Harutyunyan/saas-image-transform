<script setup lang="ts">
import { useClerkProvide } from "vue-clerk";
import { transformationTypes } from "@/constants";
import { Button } from "@/components/ui/button";
import { getImageSize } from "@/lib/utils";
import { toast } from "vue-sonner";
import type { TransformationTypeKey, Image } from "@/types";

definePageMeta({ middleware: "auth" });

useHead({
  title: "Imaginify | Transformation details",
});

const { state } = useClerkProvide();

const route = useRoute();

const imageId = route.params?.imageId as TransformationTypeKey;

const image = await $fetch<Image>(`/api/image/${imageId}`);

if (!image._id) {
  toast.info("Image not found");
  navigateTo("/");
}

const transformation = transformationTypes[image?.transformationType];
</script>

<template>
  <Header :title="transformation.title" :subtitle="transformation.subTitle" />

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

      <TransformedImage
        :image="image"
        :type="image.config"
        :title="image.title"
        :isTransforming="false"
        :transformationConfig="toRaw(image.config)"
        :hasDownload="true"
      />
    </div>

    <div class="mt-4 space-y-4" v-if="state?.user?.id === image.author.clerkId">
      <Button as-child type="button" class="submit-button capitalize">
        <NuxtLink :to="`/transformations/${image._id}/update`">
          Update Image
        </NuxtLink>
      </Button>

      <DeleteConfirmation :imageId="image._id" />
    </div>
  </section>
</template>
