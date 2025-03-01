// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@vuestic/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    moduleSideEffects: ['reflect-metadata'],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})