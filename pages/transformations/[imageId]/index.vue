<script setup lang="ts">
import { useClerkProvide } from "vue-clerk";
import { transformationTypes } from "@/constants";
import { Button } from "@/components/ui/button";
import { getImageSize } from "@/lib/utils";
import type { TransformationTypeKey, Image } from "@/types";

definePageMeta({ middleware: "auth" });

useHead({
  title: "Imaginify | Transformation details",
});

const { state } = useClerkProvide();

const route = useRoute();

const imageId = route.params?.imageId as TransformationTypeKey;

const { data: image, status } = await useFetch<Image>(`/api/image/${imageId}`);

const transformation = computed(() => {
  return image.value
    ? transformationTypes[image.value?.transformationType]
    : null;
});
</script>

<template>
  <Loader v-if="status === 'pending'" fullPage />

  <template v-else>
    <Header
      v-if="transformation"
      :title="transformation?.title"
      :subtitle="transformation?.subTitle"
    />
    <template v-if="image">
      <section class="mt-5 flex flex-wrap gap-4">
        <ImageDetails
          v-if="image?.transformationType"
          label="Transformation"
          value="{{ image?.transformationType }}"
        />

        <template v-if="image?.prompt">
          <p class="hidden text-dark-400/50 md:block">&#x25CF;</p>
          <ImageDetails
            v-if="image?.prompt"
            label="Prompt"
            value="{{ image.prompt }}"
          />
        </template>

        <template v-if="image.color">
          <p class="hidden text-dark-400/50 md:block">&#x25CF;</p>
          <ImageDetails
            v-if="image.color"
            label="Color"
            value="{{ image.color }}"
          />
        </template>

        <template v-if="image.aspectRatio">
          <p class="hidden text-dark-400/50 md:block">&#x25CF;</p>
          <ImageDetails
            v-if="image.aspectRatio"
            label="Aspect Ratio"
            value="{{ image.aspectRatio }}"
          />
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

        <div
          class="mt-4 space-y-4"
          v-if="state?.user?.id === image.author.clerkId"
        >
          <Button as-child type="button" class="submit-button capitalize">
            <NuxtLink :to="`/transformations/${image._id}/update`">
              Update Image
            </NuxtLink>
          </Button>

          <DeleteConfirmation :imageId="image._id" />
        </div>
      </section>
    </template>
  </template>
</template>
