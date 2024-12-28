<script setup lang="ts">
import { toast } from "vue-sonner";
interface TransactionData {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}

interface CheckoutResponse {
  url: string;
}

interface CheckoutProps {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}
const { plan, amount, credits, buyerId } = defineProps<CheckoutProps>();
const isLoading = ref(false);

const onCheckout = async () => {
  const transaction = {
    plan,
    amount,
    credits,
    buyerId,
  } as TransactionData;

  isLoading.value = true;
  try {
    const response = await $fetch<CheckoutResponse>("/api/checkout-credits", {
      method: "POST",
      body: {
        transaction,
      },
    });

    if (response && typeof response === "object" && "url" in response) {
      window.location.href = response.url as string;
    }
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="onCheckout">
    <section>
      <Button
        type="submit"
        role="link"
        class="w-full rounded-full bg-purple-gradient bg-cover"
      >
        {{ isLoading ? "Loading" : "Buy Credit" }}
      </Button>
    </section>
  </form>
</template>
