<script setup lang="ts">
import { SignUp } from "vue-clerk";
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
    <SignUp sign-in-url="/sign-in" />
  </div>
</template>
