<script setup>
import upgradeBannerDark from '@/assets/images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@/assets/images/pro/upgrade-banner-light.png'
import logo from '@/assets/logo.png'
import { useAuthStore } from '@/store/auth'
import {
  VerticalNavLink,
  VerticalNavSectionTitle,
} from '@layouts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})
const store = useAuthStore();
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <RouterLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <!-- ℹ️ You can also use img tag or VImg here -->
       <img :src="logo" width="200" height="120" />

    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <ul v-if="store.user">
    <template v-if="store.user.type == 'Guest'">
      <VerticalNavLink
    
      :item="{
        title: 'Dashboard',
        to: 'guest-event',
        icon: { icon: 'mdi-home-outline' }
      }"
    />
     <VerticalNavLink
    
      :item="{
        title: 'Invitations',
        to: 'guest',
        icon: { icon: 'mdi-home-outline' }
      }"
    />
    <VerticalNavLink
    
      :item="{
        title: 'Booked Events',
        to: 'book',
        icon: { icon: 'mdi-home-outline' }
      }"
    />
    </template>
    
    <template v-else>

      <VerticalNavLink
      :item="{
        title: 'Dashboard',
        to: 'index',
        icon: { icon: 'mdi-home-outline' }
      }"
    />
    <VerticalNavLink
    :item="{
      title: 'Create Event',
      to: 'event',
      icon: { icon: 'mdi-form-select' }
    }"
    />
    <VerticalNavLink
    :item="{
      title: 'Manage Rsvps',
      to: 'rsvp',
      icon: { icon: 'mdi-form-select' }
    }"
    />
    <VerticalNavLink
    :item="{
      title: 'Testimonials',
      to: 'testimonials',
      icon: { icon: 'mdi-form-select' }
    }"
    />
  </template>
  </ul>

  <!-- 👉 illustration -->
  
</template>

<style lang="scss">
// .v-navigation-drawer {
//   height: 100%;

//   .v-navigation-drawer__content {
//     display: flex;
//     flex-direction: column;

//     > ul {
//       flex-grow: 1;
//     }
//   }
// }

.upgrade-banner {
  margin-top: auto;
  // position: absolute;
  // bottom: 13px;
  // left: 50%;
  // transform: translateX(-50%);
}
</style>
