<script setup lang="ts">
import {validators} from '~/utils/index.js'

const emit = defineEmits<{ (event: 'submit'): void }>()

const showModal = defineModel('showModal')
const formData = defineModel('formData')
const submit = () => {
  emit('submit')
}
</script>

<template>
  <VaModal v-model="showModal" ok-text="Confirm" fixed-layout @ok="submit">
    <VaForm ref="form" class="mb-10" @submit.prevent="submit">
      <h3 class="font-semibold text-4xl mb-4">User Login History</h3>

      <VaInput
          v-model="formData.email"
          :rules="[validators.required, validators.email]"
          class="mb-4"
          label="Email"
          type="email"
      />

      <VaInput
          v-model="formData.ip"
          :rules="[validators.required]"
          class="mb-4"
          label="IP"
          type="text"
      />

      <VaInput
          v-model="formData.device"
          :rules="[validators.required]"
          class="mb-4"
          label="Device"
          type="text"
      />
      <VaInput
          v-model="formData.time"
          :rules="[validators.required]"
          class="mb-4"
          label="Login Time"
          type="text"
      />
    </VaForm>
  </VaModal>
</template>
