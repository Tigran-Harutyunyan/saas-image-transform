<script setup lang="ts">
import { ClerkLoaded } from "vue-clerk";
import { Toaster } from "@/components/ui/sonner";
</script>
<template>
  <ClerkLoaded>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster />
  </ClerkLoaded>
</template>
