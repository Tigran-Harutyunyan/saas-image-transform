<script setup lang="ts">
definePageMeta({ middleware: "auth" });
useHead({
  title: "Imaginify | Profile",
});
const { images, page, pending } = useImages();

const user = await $fetch("/api/user");

if (!user?._id) {
  navigateTo("/");
}
</script>

<template>
  <Header title="Profile" />

  <section class="profile">
    <div class="profile-balance">
      <p class="p-14-medium md:p-16-medium">CREDITS AVAILABLE</p>
      <div class="mt-4 flex items-center gap-4">
        <NuxtImg
          src="/assets/icons/coins.svg"
          alt="coins"
          :width="50"
          :height="50"
          class="size-9 md:size-12"
        />
        <h2 class="h2-bold text-dark-600">{{ user.creditBalance }}</h2>
      </div>
    </div>

    <div class="profile-image-manipulation">
      <p class="p-14-medium md:p-16-medium">IMAGE MANIPULATION DONE</p>
      <div class="mt-4 flex items-center gap-4">
        <NuxtImg
          src="/assets/icons/photo.svg"
          alt="coins"
          :width="50"
          :height="50"
          class="size-9 md:size-12"
        />
        <h2 class="h2-bold text-dark-600">{{ images?.data.length }}</h2>
      </div>
    </div>
  </section>

  <section class="mt-8 md:mt-14" v-if="!pending">
    <Collection
      :images="images?.data"
      :totalPages="images?.totalPages"
      :page="page"
    />
  </section>
</template>
