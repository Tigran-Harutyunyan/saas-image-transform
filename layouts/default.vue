<script setup lang="ts"></script>
<template>
  <main class="flex min-h-screen w-full flex-col bg-white lg:flex-row">
    <Sidebar />
    <MobileNav />
    <div
      class="mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10"
    >
      <div
        class="max-w-5xl mx-auto px-5 md:px-10 w-full text-dark-400 p-16-regular"
      >
        <slot />
      </div>
    </div>
    <Toaster />
  </main>
</template>
