<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import { validators } from '@/utils/validators'

definePageMeta({
  layout: 'auth',
})

const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  email: '',
  password: '',
  keepLoggedIn: false,
})

const submit = () => {
  if (validate()) {
    init({ message: "You've successfully logged in", color: 'success' })
    push({ name: 'dashboard' })
  }
}
</script>

<template>
  <VaForm ref="form" class="mb-10" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">Log in</h1>

    <VaInput
      v-model="formData.email"
      :rules="[validators.required, validators.email]"
      class="mb-4"
      label="Email"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="Password"
        @click-append-inner.stop="
          isPasswordVisible.value = !isPasswordVisible.value
        "
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div
      class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between"
    >
      <VaCheckbox
        v-model="formData.keepLoggedIn"
        class="mb-2 sm:mb-0"
        label="Keep me signed in on this device"
      />
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit"> Login</VaButton>
    </div>
    <div class="flex justify-center mt-2">
      <VaButton class="w-full" color="secondary" @click="submit">
        Login with Google</VaButton
      >
    </div>
  </VaForm>
</template>
