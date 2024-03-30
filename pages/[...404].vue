<script setup>
import { Button } from "~/components/ui/button";
definePageMeta({ layout: "auth" });
useHead({
  title: "SaaS | 404",
});
</script>

<template>
  <div
    class="h-full w-full flex flex-col justify-center items-center content-center flex-wrap"
  >
    <NuxtImg src="/assets/images/404.jpg" :width="400"> </NuxtImg>
    <NuxtLink to="/" class="mx-auto mt-5">
      <Button variant="outline" class="credits-btn"> Back to home </Button>
    </NuxtLink>
  </div>
</template>
