<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const router = useRouter();
const query = ref();

const debouncedFn = useDebounceFn(() => {
  const locationSearch = location.search;

  if (query.value) {
    const newUrl = formUrlQuery({
      searchParams: locationSearch,
      key: "query",
      value: query.value,
    });

    router.push(newUrl);
  } else {
    const newUrl = removeKeysFromQuery({
      searchParams: locationSearch,
      keysToRemove: ["query"],
    });

    router.push(newUrl);
  }
}, 300);

onMounted(() => {
  const searchParams = new URLSearchParams(location.search);
  if (searchParams && searchParams.has("query")) {
    query.value = searchParams.get("query");
  }
});
</script>

<template>
  <div class="search">
    <NuxtImg
      src="/assets/icons/search.svg"
      alt="search"
      :width="24"
      :height="24"
    />

    <Input
      class="search-field"
      placeholder="Search for tags like art"
      v-model="query"
      @update:modelValue="debouncedFn"
    />
  </div>
</template>
