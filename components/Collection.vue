<script setup lang="ts">
import Paginator from "@/components/Paginator.vue";

interface Image {
  id: string;
  title: string;
  url: string;
}

interface ApiResponse {
  totalPages: number;
  data: Image[];
}

const emit = defineEmits(["pageChange"]);

interface CollectionProps {
  home?: boolean;
}

const props = withDefaults(defineProps<CollectionProps>(), {
  home: false,
});

const route = useRoute();

const page = ref<number>(Number(route.query.page) || 1);

const url = computed(() => (props.home ? "/api/images" : "/api/user/images"));

const fetchUrl = computed(() => `${url.value}?page=${page.value}`);

const { data, pending } = useLazyAsyncData<ApiResponse>(
  "images",
  () => $fetch<ApiResponse>(fetchUrl.value),
  { watch: [fetchUrl], server: true }
);

const totalPages = computed<number>(() => data.value?.totalPages || 0);
const images = computed<Image[]>(() => data.value?.data || []);

const onPageChange = async (newPage: number) => {
  if (newPage < 1 || newPage > totalPages.value) return;

  page.value = newPage;

  navigateTo({
    path: route.path,
    query: { ...route.query, page: newPage.toString() },
  });
};
</script>

<template>
  <div class="collection-heading">
    <h2 class="h2-bold text-dark-600">Recent Edits</h2>
  </div>

  <ul v-if="images?.length > 0" class="collection-list">
    <Card v-for="image in images" :image="image" :key="image._id" />
  </ul>

  <div v-else class="collection-empty">
    <Loader v-if="pending" />
    <p v-else class="p-20-semibold">Empty List</p>
  </div>

  <Paginator
    v-if="totalPages > 1"
    :total="totalPages"
    :page="page"
    class="mt-10"
    @change="onPageChange"
  />
</template>
