<script setup>
import { useAuthStore } from "./store/auth"

const store = useAuthStore()
</script>

<template>
  <VApp>
    <v-snackbar
      v-model="store.snackbar"
      :color="store.color"
      location="top right"

      >
      {{ store.text }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="store.snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <VLayout class="layout-wrapper layout-nav-type-vertical">
      <RouterView />
    </VLayout>
  </VApp>
</template>
