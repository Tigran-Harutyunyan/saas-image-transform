<script setup lang="ts">
import { Loader } from "lucide-vue-next";

interface LoaderProps {
  fullPage?: boolean;
}

defineProps<LoaderProps>();
</script>

<template>
  <div
    class="flex items-center justify-center w-full"
    :class="{ 'h-full ': fullPage }"
  >
    <Loader class="h-6 w-6 text-muted-foreground animate-spin" />
  </div>
</template>
