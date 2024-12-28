<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
}

defineProps<Props>();
</script>

<template>
  <h2 class="h2-bold text-dark-600">{{ title }}</h2>
  <p v-if="subtitle" class="p-16-regular mt-4">{{ subtitle }}</p>
</template>
