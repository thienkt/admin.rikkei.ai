<script lang="ts" setup>
import { defineVaDataTableColumns } from 'vuestic-ui'
import { generateUsers } from '~/utils'
import Table from '~/components/dashboard/Table.vue'

const listUser = ref(generateUsers(22))
const columns = ref(
  defineVaDataTableColumns([
    { label: 'Email', key: 'email', sortable: true },
    { label: 'IP', key: 'ip', sortable: true },
    { label: 'Device', key: 'device', sortable: true },
    { label: 'Time', key: 'time', sortable: true },
    { label: 'Active', key: 'active', sortable: true },
    { label: '', key: 'actions', align: 'right' },
  ]),
)
</script>

<template>
  <h1
    class="page-title text-[32px] md:text-5xl font-bold leading-9 md:leading-[56px] max-sm:mt-6 mb-6 md:mb-4"
  >
    User Login History
  </h1>
  <section class="flex flex-col gap-4">
    <VaCard class="w-full">
      <VaCardContent>
        <div class="flex flex-col gap-4">
          <Table
            class="w-full"
            sort-by="email"
            sorting-order="asc"
            :users="listUser"
            :columns="columns"
            :loading="false"
            :pagination="{ page: 1, perPage: 20, total: listUser.length }"
          />
        </div>
      </VaCardContent>
    </VaCard>
  </section>
</template>
