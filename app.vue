<script setup lang="ts">
import { ClerkLoaded, ClerkLoading } from "vue-clerk";
import { Toaster } from "@/components/ui/sonner";
</script>
<template>
  <ClerkLoading>
    <Loader fullPage />
  </ClerkLoading>
  <ClerkLoaded>
    <NuxtLoadingIndicator color="#5030ff" :height="6" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ClerkLoaded>
  <Toaster />
</template>
