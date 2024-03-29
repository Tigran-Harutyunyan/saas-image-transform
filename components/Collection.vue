<script setup lang="ts">
import {
  Pagination,
  PaginationNext,
  PaginationPrev,
  PaginationList,
} from "@/components/ui/pagination";
import { type IImage } from "@/lib/database/models/image.model";
import { formUrlQuery } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Search from "@/components/Search.vue";

const emit = defineEmits(["pageChange"]);

interface Props {
  images: IImage[];
  totalPages: number;
  hasSearch?: boolean;
}

const { hasSearch = false, images, totalPages } = defineProps<Props>();
const page = ref(1);

const onPageChange = (action: string) => {
  if (page.value < 1 || page.value > totalPages) return;

  const pageValue = action === "next" ? page.value + 1 : page.value - 1;

  const newUrl = formUrlQuery({
    searchParams: location.search,
    key: "page",
    value: pageValue,
  });

  navigateTo(newUrl);
  emit("pageChange");
};

const getPageNumber = () => {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.has("page") ? Number(searchParams.get("page")) : 1;
};

watch(
  () => useRoute().fullPath,
  () => {
    page.value = getPageNumber();
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<template>
  <div class="collection-heading">
    <h2 class="h2-bold text-dark-600">Recent Edits</h2>
    <Search v-if="hasSearch" />
  </div>

  <ul v-if="images?.length > 0" class="collection-list">
    <Card v-for="image in images" :image="image" :key="image._id" />
  </ul>

  <div v-else class="collection-empty">
    <p class="p-20-semibold">Empty List</p>
  </div>

  <Pagination v-if="totalPages > 1" :total="totalPages" class="mt-10">
    <PaginationList class="flex w-full">
      <Button
        :disabled="Number(page) <= 1"
        class="collection-btn"
        @click="onPageChange('prev')"
      >
        <PaginationPrev class="hover:bg-transparent hover:text-white" />
      </Button>

      <p class="flex-center p-16-medium w-fit flex-1">
        {{ page }} / {{ totalPages }}
      </p>

      <Button
        :disabled="Number(page) >= totalPages"
        class="collection-btn"
        @click="onPageChange('next')"
      >
        <PaginationNext class="hover:bg-transparent hover:text-white" />
      </Button>
    </PaginationList>
  </Pagination>
</template>
