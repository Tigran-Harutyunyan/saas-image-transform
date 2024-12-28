<script setup lang="ts">
import { transformationTypes } from "@/constants";
import type { TransformationTypeKey, Image } from "@/types";

definePageMeta({ middleware: "auth" });

useHead({
  title: "Imaginify | Update transformation",
});

const route = useRoute();

const type = route.params?.type as TransformationTypeKey;
const imageId = route.params?.imageId as string;

const {
  data: image,
  pending: isImagePending,
  error: imageError,
} = await useFetch<Image>(`/api/image/${imageId}`);

const transformation = computed(() => {
  if (!image.value?.transformationType) return null;
  return (
    transformationTypes[image.value.transformationType] || {
      title: "Unknown Transformation",
      subTitle: "Details unavailable",
    }
  );
});

const {
  data: user,
  pending: isUserPending,
  error: userError,
} = await useFetch("/api/user");

const isPending = computed(() => isImagePending.value || isUserPending.value);
const hasError = computed(() => imageError.value || userError.value);
</script>

<template>
  <Loader v-if="isPending" fullPage />

  <template v-else-if="hasError">
    <div class="error-state">
      <p class="error-message">Failed to load data. Please try again later.</p>
    </div>
  </template>

  <template v-else>
    <Header
      v-if="transformation"
      :title="transformation?.title"
      :subtitle="transformation?.subTitle"
    />

    <section class="mt-10">
      <ClientOnly>
        <TransformationForm
          v-if="user && image"
          action="Update"
          :userId="user?._id"
          :type="image?.transformationType"
          :creditBalance="user?.creditBalance"
          :config="image.config"
          :data="image"
        />
      </ClientOnly>
    </section>
  </template>
</template>
