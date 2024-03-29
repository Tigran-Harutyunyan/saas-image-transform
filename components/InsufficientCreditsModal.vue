<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
</script>

<template>
  <AlertDialog defaultOpen>
    <AlertDialogContent>
      <AlertDialogHeader>
        <div class="flex-between">
          <p class="p-16-semibold text-dark-400">Insufficient Credits</p>
          <AlertDialogCancel
            class="border-0 p-0 hover:bg-transparent"
            @click="navigateTo('/profile')"
          >
            <NuxtImg
              src="/assets/icons/close.svg"
              alt="credit coins"
              :width="24"
              :height="24"
              class="cursor-pointer"
            />
          </AlertDialogCancel>
        </div>

        <NuxtImg
          src="/assets/images/stacked-coins.png"
          alt="credit coins"
          :width="462"
          :height="122"
        />

        <AlertDialogTitle class="p-24-bold text-dark-600">
          Oops.... Looks like you&#39;ve run out of free credits!
        </AlertDialogTitle>

        <AlertDialogDescription class="p-16-regular py-3">
          No worries, though - you can keep enjoying our services by grabbing
          more credits.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel
          class="button w-full bg-purple-100 text-dark-400"
          @click="navigateTo('/profile')"
        >
          No, Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          class="button w-full bg-purple-gradient bg-cover"
          @click="navigateTo('/credits')"
        >
          Yes, Proceed
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
