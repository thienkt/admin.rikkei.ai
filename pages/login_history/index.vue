<script lang="ts" setup>
import Table from '~/components/dashboard/Table.vue'
</script>

<template>
  <h1 class="page-title text-[32px] md:text-5xl font-bold leading-9 md:leading-[56px] max-sm:mt-6 mb-6 md:mb-4">
    User Login History
  </h1>
  <section class="flex flex-col gap-4">
    <VaCard class="w-full">
      <VaCardContent>
        <div class="flex flex-col gap-4">
          <Table
              class="w-full "
              sort-by="email"
              sorting-order="asc"
              :users="[]"
              :projects="[]"
              :loading="false"
              :pagination="{page: 0, perPage: 10, total: 0}"
          />
        </div>
      </VaCardContent>
    </VaCard>

  </section>
</template>
