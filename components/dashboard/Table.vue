<script setup lang="ts">
import { type DataTableColumnSource, useModal } from 'vuestic-ui'

import { type PropType, computed, toRef } from 'vue'

export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: keyof User | undefined
  sortingOrder: 'asc' | 'desc' | null
}

import { useVModel } from '@vueuse/core'
import type { User } from '@/types'

const props = defineProps({
  users: {
    type: Array as PropType<User[]>,
    required: true,
  },
  columns: {
    type: Array as PropType<DataTableColumnSource<string>[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<Pagination>, required: false },
  sortBy: { type: String as PropType<Sorting['sortBy']>, required: true },
  sortingOrder: {
    type: String as PropType<Sorting['sortingOrder']>,
    default: null,
  },
})

const emit = defineEmits<{
  (event: 'edit-user', user: User): void
  (event: 'delete-user', user: User): void
  (event: 'update:sortBy', sortBy: Sorting['sortBy']): void
  (event: 'update:sortingOrder', sortingOrder: Sorting['sortingOrder']): void
}>()

const users = toRef(props, 'users')
const sortByVModel = useVModel(props, 'sortBy', emit)
const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)

const totalPages = computed(() =>
  props.pagination
    ? Math.ceil(props.pagination.total / props.pagination.perPage)
    : 0,
)

const { confirm } = useModal()

const onUserDelete = async (user: User) => {
  const agreed = await confirm({
    title: 'Delete user',
    message: `Are you sure you want to delete ${user.email}?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    emit('delete-user', user)
  }
}

const formatDate = (date: string) => new Date(date).toLocaleString()
</script>

<template>
  <VaDataTable
    v-model:sort-by="sortByVModel"
    v-model:sorting-order="sortingOrderVModel"
    :columns="columns"
    :items="users"
    :loading="$props.loading"
  >
    <template #cell(email)="{ rowData }">
      <div class="flex items-center gap-2 max-w-[230px] ellipsis">
        {{ rowData.email }}
      </div>
    </template>

    <template #cell(ip)="{ rowData }">
      <div class="max-w-[120px] ellipsis">
        {{ rowData.ip }}
      </div>
    </template>

    <template #cell(device)="{ rowData }">
      <div class="ellipsis max-w-[230px]">
        {{ rowData.device }}
      </div>
    </template>

    <template #cell(time)="{ rowData }">
      <div class="ellipsis max-w-[230px]">
        {{ formatDate(rowData.time) }}
      </div>
    </template>

    <template #cell(active)="{ rowData }">
      <div class="ellipsis max-w-[230px]">
        <VaSwitch v-model="rowData.active" color="info" size="small" />
      </div>
    </template>

    <template #cell(actions)="{ rowData }">
      <div class="flex gap-2 justify-end">
        <VaButton
          preset="primary"
          size="small"
          icon="edit"
          aria-label="Edit user"
          @click="$emit('edit-user', rowData as User)"
        />
        <VaButton
          preset="primary"
          size="small"
          icon="delete"
          color="danger"
          aria-label="Delete user"
          @click="onUserDelete(rowData as User)"
        />
      </div>
    </template>
  </VaDataTable>

  <div
    v-if="$props.pagination"
    class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2"
  >
    <div>
      <b>{{ $props.pagination.total }} results.</b>
      Results per page
      <VaSelect
        v-model="$props.pagination.perPage"
        class="!w-20"
        :options="[10, 50, 100]"
      />
    </div>

    <div v-if="totalPages > 1" class="flex">
      <VaButton
        preset="secondary"
        icon="va-arrow-left"
        aria-label="Previous page"
        :disabled="$props.pagination.page === 1"
        @click="$props.pagination.page--"
      />
      <VaButton
        class="mr-2"
        preset="secondary"
        icon="va-arrow-right"
        aria-label="Next page"
        :disabled="$props.pagination.page === totalPages"
        @click="$props.pagination.page++"
      />
      <VaPagination
        v-model="$props.pagination.page"
        buttons-preset="secondary"
        :pages="totalPages"
        :visible-pages="5"
        :boundary-links="false"
        :direction-links="false"
      />
    </div>
  </div>
</template>

<style lang="css" scoped>
::v-deep(.va-data-table__table-tr) {
  border-bottom: 1px solid var(--va-background-border);
}

::v-deep(.va-data-table__table-th-wrapper) {
  font-weight: 500;
  font-size: 1rem;
}
</style>
