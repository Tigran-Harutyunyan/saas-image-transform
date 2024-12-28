<script setup lang="ts">
import {
  Pagination,
  PaginationNext,
  PaginationPrev,
  PaginationList,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  total: number;
  page: number;
}
defineProps<PaginationProps>();

const emit = defineEmits(["change"]);
</script>

<template>
  <Pagination :total="total" class="mt-10">
    <PaginationList class="flex w-full">
      <Button
        :disabled="Number(page) <= 1"
        class="collection-btn"
        @click="emit('change', page - 1)"
      >
        <PaginationPrev class="hover:bg-transparent hover:text-white" />
      </Button>

      <p class="flex-center p-16-medium w-fit flex-1">
        {{ page }} / {{ total }}
      </p>

      <Button
        :disabled="Number(page) >= total"
        class="collection-btn"
        @click="emit('change', page + 1)"
      >
        <PaginationNext class="hover:bg-transparent hover:text-white" />
      </Button>
    </PaginationList>
  </Pagination>
</template>
