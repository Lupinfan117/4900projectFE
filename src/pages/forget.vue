<script setup>
import { useTheme } from 'vuetify'
import logo from '@/assets/logo.png'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png'
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png'
import {useAuthStore} from '../store/auth';
import {  useRouter } from 'vue-router'

const auth = useAuthStore();
const router = useRouter();
const form = ref({
  email: '',
  password: '',
})
const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
const isPasswordVisible = ref(false)

const forget = async () =>{
  await auth.forget(form.value.email);
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
           <img :src="logo" width="300" height="150" />
        </template>

      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Forgot your password? No worries
        </h5>
        <p class="mb-0">
          Please enter your email to reset your password.
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="forget">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="email"
                type="text"
              />
              <VBtn
                block
                type="submit"
                class="mt-4"
              >
                Submit              
              </VBtn>
            </VCol>

            <!-- password -->
            
            <!-- login instead -->
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




            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>New on our platform?</span>
              <RouterLink
                class="text-primary ms-2"
                :to="{ name: 'register' }"
              >
                Create an account
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
