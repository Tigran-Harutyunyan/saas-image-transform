<script setup lang="ts">
import { UserButton, SignedIn, SignedOut } from "vue-clerk";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/constants";
</script>

<template>
  <header class="header">
    <NuxtLink to="/" class="flex items-center gap-2 md:py-2">
      <NuxtImg
        src="/assets/images/logo-text.svg"
        alt="logo"
        :width="180"
        :height="28"
      />
    </NuxtLink>

    <nav class="flex gap-2">
      <SignedIn>
        <UserButton afterSignOutUrl="/" />

        <Sheet>
          <SheetTrigger>
            <NuxtImg
              src="/assets/icons/menu.svg"
              alt="menu"
              :width="32"
              :height="32"
              class="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent class="sheet-content sm:w-64">
            <NuxtImg
              src="/assets/images/logo-text.svg"
              alt="logo"
              :width="152"
              :height="152"
            />

            <ul class="header-nav_elements">
              <li
                v-for="link in navLinks"
                :class="`${
                  link.route === useRoute().path && 'gradient-text'
                } p-18 flex whitespace-nowrap text-dark-700`"
                :key="link.route"
              >
                <NuxtLink class="sidebar-link cursor-pointer" :to="link.route">
                  <NuxtImg
                    :src="link.icon"
                    alt="logo"
                    :width="24"
                    :height="24"
                  />
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      </SignedIn>

      <SignedOut>
        <Button as-child class="button bg-purple-gradient bg-cover">
          <NuxtLink to="/sign-in">Login</NuxtLink>
        </Button>
      </SignedOut>
    </nav>
  </header>
</template>
