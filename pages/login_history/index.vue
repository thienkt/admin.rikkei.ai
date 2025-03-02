<script lang="ts" setup>
import {defineVaDataTableColumns} from 'vuestic-ui'
import {generateUsers} from '~/utils'
import Table from '~/components/dashboard/Table.vue'
import {computed, ref} from "vue";
import type {User} from "~/types";

const listUser = ref(generateUsers(22))
const columns = ref(
    defineVaDataTableColumns([
      {label: 'Email', key: 'email', sortable: true},
      {label: 'IP', key: 'ip', sortable: true},
      {label: 'Device', key: 'device', sortable: true},
      {label: 'Login Time', key: 'time', sortable: true},
      {label: 'Actions', key: 'actions'},
    ]),
)
const showModalAddUser = ref(false)
const newUser = ref<User | null>({})
const sortBy = ref('email')
const sortingOrder = ref<'asc' | 'desc' | null>('asc')
const pagination = ref({page: 1, perPage: 20, total: listUser.value.length})

const paginatedUsers = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.perPage
  const end = start + pagination.value.perPage
  return listUser.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(pagination.value.total / pagination.value.perPage)
})

const onEditUser = (user: User) => {
  const selectedUser = listUser.value.find((u) => u.id === user.id)
  selectedUser && Object.assign(selectedUser, user)
}

const onDeleteUser = (user: User) => {
  const index = listUser.value.findIndex((u) => u.id === user.id)
  if (index !== -1) {
    listUser.value.splice(index, 1)
    pagination.value.total = listUser.value.length
  }
}

const onUpdateSortBy = (newSortBy: string) => {
  sortBy.value = newSortBy
  updateListUser()
}

const onUpdateSortingOrder = (newSortingOrder: 'asc' | 'desc' | null) => {
  sortingOrder.value = newSortingOrder
  updateListUser()
}

const updateListUser = () => {
  // Implement sorting logic here based on sortBy and sortingOrder
  // For example:
  listUser.value.sort((a, b) => {
    if (sortingOrder.value === 'asc') {
      return a[sortBy.value] > b[sortBy.value] ? 1 : -1
    } else {
      return a[sortBy.value] < b[sortBy.value] ? 1 : -1
    }
  })
}

const onSubmitAddUser = () => {
  if (newUser.value) {
    listUser.value.push({...newUser.value, active: false, id: listUser.value.length + 1})
    pagination.value.total = listUser.value.length
    newUser.value = {}
    showModalAddUser.value = false
  }
}
</script>

<template>
  <div class="flex items-start justify-between items-center">
    <h1
        class="page-title text-[32px] md:text-5xl font-bold leading-9 md:leading-[56px] max-sm:mt-6 mb-6 md:mb-4"
    >
      User Login History
    </h1>
    <VaButton preset="primary" @click="showModalAddUser = true">
      Add new record
    </VaButton>
  </div>
  <section class="flex flex-col gap-4">
    <VaCard class="w-full">
      <VaCardContent>
        <div class="flex flex-col gap-4">
          <Table
              class="w-full"
              :sort-by="sortBy"
              :sorting-order="sortingOrder"
              :users="paginatedUsers"
              :columns="columns"
              :loading="false"
              :pagination="pagination"
              @edit-user="onEditUser"
              @delete-user="onDeleteUser"
              @update:sortBy="onUpdateSortBy"
              @update:sortingOrder="onUpdateSortingOrder"
          />
          <div
              v-if="pagination"
              class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2"
          >
            <div>
              <b>{{ pagination.total }} results.</b>
              Results per page
              <VaSelect
                  v-model="pagination.perPage"
                  class="!w-20"
                  :options="[10, 50, 100]"
              />
            </div>

            <div v-if="totalPages > 1" class="flex">
              <VaButton
                  preset="secondary"
                  icon="va-arrow-left"
                  aria-label="Previous page"
                  :disabled="pagination.page === 1"
                  @click="pagination.page--"
              />
              <VaButton
                  class="mr-2"
                  preset="secondary"
                  icon="va-arrow-right"
                  aria-label="Next page"
                  :disabled="pagination.page === totalPages"
                  @click="pagination.page++"
              />
              <VaPagination
                  v-model="pagination.page"
                  buttons-preset="secondary"
                  :pages="totalPages"
                  :visible-pages="5"
                  :boundary-links="false"
                  :direction-links="false"
              />
            </div>
          </div>
        </div>
      </VaCardContent>
    </VaCard>
  </section>
  <ModalUserEdit
      v-model:showModal="showModalAddUser"
      v-model:formData="newUser"
      @submit="onSubmitAddUser"
  />
</template>
