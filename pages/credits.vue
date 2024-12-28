<script setup lang="ts">
import { SignedIn } from "vue-clerk";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants";

definePageMeta({ middleware: "auth" });

useHead({
  title: "Imaginify | Credits",
});

const user = await useFetch("/api/user");
</script>

<template>
  <section>
    <Header
      title="Buy Credits"
      subtitle="Choose a credit package that suits your needs!"
    />

    <ul class="credits-list">
      <li v-for="plan in plans" :key="plan.name" class="credits-item">
        <div class="flex-center flex-col gap-3">
          <NuxtImg :src="plan.icon" alt="check" :width="50" :height="50" />
          <p class="p-20-semibold mt-2 text-purple-500">
            {{ plan.name }}
          </p>
          <p class="h1-semibold text-dark-600">${{ plan.price }}</p>
          <p class="p-16-regular">{{ plan.credits }} Credits</p>
        </div>

        <PlanInclusions :plan="plan" />

        <Button
          v-if="plan.name === 'Free'"
          variant="outline"
          class="credits-btn"
        >
          Free Consumable
        </Button>

        <SignedIn v-else>
          <Checkout
            :plan="plan.name"
            :amount="plan.price"
            :credits="plan.credits"
            :buyerId="user._id"
          />
        </SignedIn>
      </li>
    </ul>
  </section>
</template>
