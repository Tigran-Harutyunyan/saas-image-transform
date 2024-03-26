<script setup lang="ts">
interface Prop {
  link: {
    icon: string;
    label: string;
    route: string;
  };
}
const { link } = defineProps<Prop>();

const route = useRoute();

const isActive = computed(() => {
  return link.route === route.path;
});
</script>

<template>
  <li
    :key="link.route"
    :class="`sidebar-nav_element group ${
      isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
    }`"
  >
    <NuxtLink class="sidebar-link" :to="link.route">
      <NuxtImg
        :src="link.icon"
        alt="logo"
        :width="24"
        :height="24"
        :class="{ 'brightness-200': isActive }"
      />
      {{ link.label }}
    </NuxtLink>
  </li>
</template>
