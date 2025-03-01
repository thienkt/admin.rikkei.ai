<script lang="ts" setup>
import { useBreakpoint } from 'vuestic-ui'

const breakpoint = useBreakpoint()
</script>
<template>
  <VaLayout v-if="breakpoint.mdUp" class="h-screen">
    <template #left>
      <div
        class="bg-primary h-full flex items-center justify-center"
        style="width: 35vw"
      >
        <h1
          class="dark:text-white font-semibold sm:text-5xl text-4xl text-black text-center"
        >
          Welcome
        </h1>
      </div>
    </template>
    <template #content>
      <main
        class="h-full flex items-center justify-center mx-auto max-w-[420px]"
      >
        <slot />
      </main>
    </template>
  </VaLayout>

  <VaLayout v-else class="h-screen">
    <template #content>
      <div class="p-4">
        <main
          class="h-full flex flex-row items-center justify-start mx-auto max-w-[420px]"
        >
          <div class="flex flex-col items-start">
            <div class="py-4">
              <h1
                class="dark:text-primary font-semibold sm:text-3xl text-4xl text-black text-center"
              >
                Welcome
              </h1>
            </div>
            <slot />
          </div>
        </main>
      </div>
    </template>
  </VaLayout>
</template>
