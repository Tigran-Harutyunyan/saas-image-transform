<script setup lang="ts">
import { transformationTypes } from "@/constants";
import { type TransformationTypeKey } from "@/types";

definePageMeta({ middleware: "auth" });

useHead({
  title: "Imaginify | Create new transformation",
});

const user = await useFetch("/api/user");

const route = useRoute();

const type = route.params?.type as TransformationTypeKey;

if (!(type && Object.keys(transformationTypes).includes(type))) {
  navigateTo("/");
}

const transformation = transformationTypes[type];
</script>

<template>
  <Header :title="transformation.title" :subtitle="transformation.subTitle" />

  <section class="mt-10">
    <ClientOnly>
      <TransformationForm
        action="Add"
        :userId="user?._id"
        :type="transformation.type"
        :creditBalance="user?.creditBalance"
      />
    </ClientOnly>
  </section>
</template>
