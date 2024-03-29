// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/cloudinary', '@fixers/nuxt-stripe', '@pinia/nuxt', "@nuxt/image", '@vueuse/nuxt', '@vee-validate/nuxt'],
  build: {
    transpile: ['vue-clerk', '@clerk/clerk-js'],
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg', href: '/images/logo.png' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap' }
      ],
    }
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  alias: {
    ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js"
  },
  runtimeConfig: {
    public: {
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      appUrl: process.env.NUXT_PUBLIC_APP_URL,
    },
    clerkSecretKey: process.env.CLERK_SECRET_KEY,
    stripeKey: process.env.STRIPE_API_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET
  },

});
