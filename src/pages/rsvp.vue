<script setup>
import { useAuthStore } from '@/store/auth';
import ManageRsvps from '@/views/dashboards/analytics/ManageRsvps.vue'
import { onMounted } from 'vue'
import {  useRouter } from 'vue-router';
const router = useRouter
const auth  = useAuthStore();
onMounted(() =>{
  const token = localStorage.getItem('token');
  if(token){
    auth.getUser();
  }
  else{
    router.push('/login');
  }
})

const search = (event) =>{
  auth.search(event.target.value);
}
</script>

<template>
  <VRow class="match-height">
    <div  class="d-flex align-center">

      <h3 class="text-title pl-3 text-primary mr-5">
       Manage Rsvps
      </h3>
      <VTextField
      @input="search"
        rounded
        prepend-inner-icon="mdi-magnify"
        density="compact"
        max-width="100px"
        clearable
        @click:clear="search"
        placeholder="Search"
        class="app-bar-search d-none d-sm-block"
        />
    </div>

    <VCol cols="12">
      <ManageRsvps />
    </VCol>
  </VRow>
  
</template>
