<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { PaginationNext, type PaginationNextProps } from "radix-vue";
import { ChevronRight } from "lucide-vue-next";
const props = withDefaults(
  defineProps<PaginationNextProps & { class?: HTMLAttributes["class"] }>(),
  {
    asChild: true,
  }
);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <PaginationNext v-bind="delegatedProps">
    <div class="flex items-center">
      <slot>
        <span class="text-sm">Next</span>
        <ChevronRight class="h-4 w-4" />
      </slot>
    </div>
  </PaginationNext>
</template>
