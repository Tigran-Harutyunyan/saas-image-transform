<script setup lang="ts">
import { SignIn } from "vue-clerk";
useHead({
  title: "AI images | Sign-in",
});
definePageMeta({
  layout: "auth",
  middleware: ["public"],
});
</script>

<template>
  <div class="grid h-full place-items-center">
    <SignIn sign-up-url="/sign-up" />
  </div>
</template>
