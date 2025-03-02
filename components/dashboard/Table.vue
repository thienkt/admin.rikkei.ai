<script setup lang="ts">
import {type DataTableColumnSource, useModal} from 'vuestic-ui'

import {type PropType, computed, toRef, ref} from 'vue'

export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: keyof User | undefined
  sortingOrder: 'asc' | 'desc' | null
}

import {useVModel} from '@vueuse/core'
import type {User} from '@/types'

const props = defineProps({
  users: {
    type: Array as PropType<User[]>,
    required: true,
  },
  columns: {
    type: Array as PropType<DataTableColumnSource<string>[]>,
    required: true,
  },
  loading: {type: Boolean, default: false},
  pagination: {type: Object as PropType<Pagination>, required: false},
  sortBy: {type: String as PropType<Sorting['sortBy']>, required: true},
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

const showModalEditUser = ref(false)
const users = toRef(props, 'users')
const selectedUser = ref<User | null>(null)
const sortByVModel = useVModel(props, 'sortBy', emit)
const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)

const {confirm} = useModal()
const onChangeStatus = async (user) => {
  const agreed = await confirm({
    title: 'Change user status',
    message: "Are you sure you want to change the status of this user?",
    okText: user.active ? 'Deactivate' : 'Activate',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    emit('edit-user', {...user, active: !user.active})
  }
}

const onEditUser = (user: User) => {
  selectedUser.value = {...user}
  showModalEditUser.value = true
}

const onSubmitEditUser = () => {
  emit('edit-user', selectedUser.value as User)
  showModalEditUser.value = false
}


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

    <template #cell(actions)="{ rowData }">
      <div class="flex gap-2 justify-center items-center">
        <VaSwitch
            :model-value="rowData.active"
            color="info"
            size="small"
            @change="onChangeStatus(rowData as User)"
        />
        <VaButton
            preset="primary"
            icon="edit"
            aria-label="Edit user"
            @click="onEditUser(rowData as User)"
        />
        <VaButton
            preset="primary"
            icon="delete"
            color="danger"
            aria-label="Delete user"
            @click="onUserDelete(rowData as User)"
        />
      </div>
    </template>
  </VaDataTable>
  <ModalUserEdit
      v-model:showModal="showModalEditUser"
      v-model:formData="selectedUser"
      @submit="onSubmitEditUser"
  />
</template>

<style lang="css" scoped>
::v-deep(.va-data-table__table-tr) {
  border-bottom: 1px solid var(--va-background-border);
}

::v-deep(.va-data-table__table-th-wrapper) {
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
}
</style>
