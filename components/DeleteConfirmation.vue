<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { toast } from "vue-sonner";

const { imageId } = defineProps<{
  imageId: string;
}>();

const isPending = ref(false);

const deleteImage = async (imageId: string) => {
  isPending.value = true;

  try {
    await $fetch(`/api/image/${imageId}`, { method: "DELETE" });
    toast.success("Image deleted successfully.");
    navigateTo("/");
  } catch (error: any) {
    const errorMessage = error?.message || "An unexpected error occurred.";
    toast.error(errorMessage);
  } finally {
    isPending.value = false;
  }
};
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child class="w-full rounded-full">
      <Button
        type="button"
        class="button h-[44px] w-full md:h-[54px]"
        variant="destructive"
      >
        Delete Image
      </Button>
    </AlertDialogTrigger>

    <AlertDialogContent class="flex flex-col gap-10">
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you want to delete this image?
        </AlertDialogTitle>
        <AlertDialogDescription class="p-16-regular">
          This will permanently delete this image
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          class="border bg-red-500 text-white hover:bg-red-600"
          @click="deleteImage(imageId)"
        >
          {{ isPending ? "Deleting..." : "Delete" }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
