<script setup lang="ts">
import { navLinks } from "@/constants";

definePageMeta({ middleware: "public" });

useHead({
  title: "Imaginify | Home",
});

const { images, page } = useImages();
</script>
<template>
  <section class="home">
    <h1 class="home-heading">Unleash Your Creative Vision with Imaginify</h1>
    <ul class="flex-center w-full gap-20">
      <NuxtLink
        v-for="link in navLinks.slice(1, 5)"
        :key="link.route"
        :to="link.route"
        class="flex-center flex-col gap-2"
      >
        <li class="flex-center w-fit rounded-full bg-white p-4">
          <NuxtImg :src="link.icon" alt="image" :width="24" :height="24" />
        </li>
        <p class="p-14-medium text-center text-white">{{ link.label }}</p>
      </NuxtLink>
    </ul>
  </section>

  <section class="sm:mt-12">
    <Collection
      :hasSearch="true"
      :images="images?.data"
      :totalPages="images?.totalPage"
      :page="page"
    />
  </section>
</template>
