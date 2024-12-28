<script setup lang="ts">
interface ImageDetailsProps {
  label: string;
  value: string;
}
defineProps<ImageDetailsProps>();
</script>

<template>
  <div class="p-14-medium md:p-16-medium flex gap-2">
    <p class="text-dark-600">{{ label }}:</p>
    <p class="capitalize text-purple-400">{{ value }}</p>
  </div>
</template>
