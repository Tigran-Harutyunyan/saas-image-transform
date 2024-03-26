<script setup>
import { Button } from "~/components/ui/button";
definePageMeta({ layout: "auth" });
useHead({
  title: "SaaS | 404",
});
</script>

<template>
  <div
    class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16"
  >
    <div class="w-full lmd:w-1/2 relative pb-12 lg:pb-0">
      <div class="relative flex items-center flex-col">
        <div class="mb-8 mx-auto">
          <img src="https://i.ibb.co/G9DC8S0/404-2.png" class="mx-auto" />
        </div>
        <NuxtLink to="/" class="mx-auto">
          <Button variant="primary" class="text-white text-lg"
            >BACK TO HOMEPAGE</Button
          >
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
