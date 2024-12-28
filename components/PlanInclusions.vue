<script setup lang="ts">
import { type Plan } from "@/types";
interface PlanInclusionsProps {
  plan: Plan;
}
defineProps<PlanInclusionsProps>();
</script>

<template>
  <ul class="flex flex-col gap-5 py-9">
    <li
      v-for="inclusion in plan.inclusions"
      :key="plan.name + inclusion.label"
      class="flex items-center gap-4"
    >
      <NuxtImg
        :src="`/assets/icons/${
          inclusion.isIncluded ? 'check.svg' : 'cross.svg'
        }`"
        alt="check"
        :width="24"
        :height="24"
      />
      <p class="p-16-regular">{{ inclusion.label }}</p>
    </li>
  </ul>
</template>
