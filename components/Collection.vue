<script setup lang="ts">
import {
  Pagination,
  PaginationNext,
  PaginationPrev,
  PaginationList,
} from "@/components/ui/pagination";

import { formUrlQuery } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Search from "@/components/Search.vue";

const emit = defineEmits(["pageChange"]);

interface Props {
  hasSearch?: boolean;
}

const { hasSearch = false } = defineProps<Props>();

const url = hasSearch ? `/api/images` : "/api/user/images";

const getPageNumber = () => {
  if (window?.location?.search) {
    const searchParams = new URLSearchParams(window?.location?.search);
    return searchParams.has("page") ? Number(searchParams.get("page")) : 1;
  }
  return 1;
};

const searchQuery = ref();

const setQuery = () => {
  searchQuery.value =
    "&searchQuery=" + window?.location?.search
      ? new URLSearchParams(window?.location?.search).get("query") ?? ""
      : "";
};

const page = ref();

const { data } = await useAsyncData(
  "images",
  () => $fetch(`${url}?page=${page.value}${searchQuery.value}`),
  { watch: [page], server: true }
);

const totalPages = computed(() => {
  return data.value?.totalPages;
});

const images = computed(() => {
  return data.value?.data;
});

const onPageChange = async (action: string) => {
  if (page.value < 1 || page.value > totalPages.value) return;

  const pageValue = action === "next" ? page.value + 1 : page.value - 1;

  const newUrl = formUrlQuery({
    searchParams: location.search,
    key: "page",
    value: pageValue,
  });

  page.value = pageValue;

  navigateTo(newUrl);
};

watch(
  () => useRoute().fullPath,
  () => {
    page.value = getPageNumber();
    setQuery();
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
