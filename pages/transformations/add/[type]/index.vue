<script setup lang="ts">
import { transformationTypes } from "@/constants";

const route = useRoute();

console.log(route.params?.type);

const type = route.params?.type as string;

if (!type) navigateTo("/");

const transformation = transformationTypes[type];
</script>

<template>
  <Header :title="transformation.title" :subtitle="transformation.subTitle" />

  <section class="mt-10">
    <!-- <TransformationForm
      action="Add"
      :userId="user._id"
      :type="transformation.type as TransformationTypeKey"
      :creditBalance="user.creditBalance"
    /> -->
  </section>
</template>
