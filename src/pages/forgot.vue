<script setup>
import { useTheme } from 'vuetify'
import logo from '@/assets/logo.svg?raw'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png'
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png'
import {useAuthStore} from '../store/auth';
import {  useRouter } from 'vue-router'

import axios from 'axios'

const auth = useAuthStore();
const router = useRouter();
const form = ref({
  email: '',
})

const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const forgot = async () => {
  const response = await axios.post('forgot', {
    email: form.value.email,
  });
  console.log(response);
  // Handle the response or redirect as needed
  // For example, you can redirect to a confirmation page
  router.push({ name: 'confirmation' });
}



</script> 

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          Party Pro
        </VCardTitle>
      </VCardItem>

      
      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
            Forgot password?  👀 
        </h5>
        <p class="mb-0">
            Please reset your password then sign-in to your account
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="forgot">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                type="text"
              />
            
              <div class="mb-4">

            </div>

              <VBtn
                block
                type="submit"
              >
                Submit
              </VBtn>
            </VCol>

            
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Remember your password?</span>
              <RouterLink
                class="text-primary ms-2"
                to="login"
              >
                Sign in instead
              </RouterLink>
            </VCol>



          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>



<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
