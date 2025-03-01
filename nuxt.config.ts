// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  modules: ['@vuestic/nuxt', '@nuxtjs/tailwindcss', '@nuxt/eslint'],
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
