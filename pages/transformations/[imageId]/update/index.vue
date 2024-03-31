<script setup lang="ts">
import { transformationTypes } from "@/constants";
import type { TransformationTypeKey, Image } from "@/types";
import { type IImage } from "@/lib/database/models/image.model";

definePageMeta({ middleware: "auth" });

useHead({
  title: "Imaginify | Update transformation",
});

const route = useRoute();

const type = route.params?.type as TransformationTypeKey;

const imageId = route.params?.imageId as string;

const { data: image } = await useLazyAsyncData<Image>(
  "image",
  () => $fetch(`/api/image/${imageId}`),
  { server: false }
);

const transformation = computed(() => {
  return image.value
    ? transformationTypes[image.value?.transformationType]
    : null;
});

const user = await useFetch("/api/user");
</script>

<template>
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
