<script setup lang="ts">
import { transformationTypes } from "@/constants";
import { type TransformationTypeKey } from "@/types";
import { type IImage } from "@/lib/database/models/image.model";
import { toast } from "vue-sonner";

definePageMeta({ middleware: "auth" });

useHead({
  title: "Imaginify | Update transformation",
});

const user = await $fetch("/api/user");

const route = useRoute();

const type = route.params?.type as TransformationTypeKey;

const imageId = route.params?.imageId as string;

const image = await $fetch<IImage>(`/api/image/${imageId}`);

if (!image._id) {
  toast.info("Image not found");
  navigateTo("/");
}

const transformation =
  transformationTypes[image.transformationType as TransformationTypeKey];
</script>

<template>
  <Header :title="transformation?.title" :subtitle="transformation?.subTitle" />

  <section class="mt-10">
    <ClientOnly>
      <TransformationForm
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
