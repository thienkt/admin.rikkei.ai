<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useGlobalStore} from '@/stores/global'

defineProps({
  isMobile: {type: Boolean, default: false},
})

const GlobalStore = useGlobalStore()

const {isSidebarMinimized} = storeToRefs(GlobalStore)
</script>

<template>
  <VaNavbar class="app-layout-navbar py-2 px-0">
    <template #left>
      <div class="left">
        <Transition v-if="isMobile" name="icon-fade" mode="out-in">
          <VaIcon
              color="primary"
              :name="isSidebarMinimized ? 'menu' : 'close'"
              size="24px"
              style="margin-top: 3px"
              @click="isSidebarMinimized = !isSidebarMinimized"
          />
        </Transition>
        <RouterLink to="/" aria-label="Visit home page">
          <h1
              class="text-primary font-semibold sm:text-3xl text-4xl text-center"
          >
            Logo
          </h1>
        </RouterLink>
      </div>
    </template>
    <template #right>
      <div class="flex justify-end items-center">
        <VaAvatar :size="32" color="warning">
          <img src="https://avatars.githubusercontent.com/u/135550293?v=4"
               alt="avatar">
        </VaAvatar>
        <span class="leading-normal align-middle min-w-max ml-2 mr-1 text-lg">admin@rikkeisoft.com</span>
        <VaButton
            preset="secondary"
            color="textPrimary"
        >
          <VaIcon name="logout" size="large"/>
        </VaButton>
      </div>
    </template>
  </VaNavbar>
</template>

<style lang="css" scoped>
.va-navbar {
  z-index: 2;
}

@media screen and (max-width: 950px) {
  .va-navbar .left {
    width: 100%;
  }

  .va-navbar .app-navbar__actions {
    display: flex;
    justify-content: space-between;
  }
}

.left {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.left > * {
  margin-right: 1rem;
}

.left > *:last-child {
  margin-right: 0;
}

.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: transform 0.5s ease;
}

.icon-fade-enter,
.icon-fade-leave-to {
  transform: scale(0.5);
}
</style>
