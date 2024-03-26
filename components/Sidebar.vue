<script setup lang="ts">
import { UserButton, SignedIn, SignedOut } from "vue-clerk";

import { navLinks } from "@/constants";
</script>

<template>
  <aside class="sidebar">
    <div class="flex size-full flex-col gap-4">
      <NuxtLink too="/" class="sidebar-logo">
        <NuxtImg
          src="/assets/images/logo-text.svg"
          alt="logo"
          :width="180"
          :height="28"
        />
      </NuxtLink>

      <nav class="sidebar-nav">
        <SignedIn>
          <ul class="sidebar-nav_elements">
            <SidebarItem
              v-for="link in navLinks.slice(0, 6)"
              :key="link.route"
              :link="link"
            >
            </SidebarItem>
          </ul>

          <ul class="sidebar-nav_elements">
            <SidebarItem
              v-for="link in navLinks.slice(6)"
              :key="link.route"
              :link="link"
            >
            </SidebarItem>
            <li class="flex-center cursor-pointer gap-2 p-4">
              <UserButton afterSignOutUrl="/" showName />
            </li>
          </ul>
        </SignedIn>

        <SignedOut>
          <Button as-child class="button bg-purple-gradient bg-cover">
            <NuxtLink to="/sign-in">Login</NuxtLink>
          </Button>
        </SignedOut>
      </nav>
    </div>
  </aside>
</template>
