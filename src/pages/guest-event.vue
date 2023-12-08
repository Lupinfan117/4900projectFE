<script setup>
import { useAuthStore } from '@/store/auth';
import AllEventsTable from '@/views/dashboards/analytics/AllEventsTable.vue'
import { onMounted } from 'vue'
import {  useRouter } from 'vue-router';
const router = useRouter
onMounted(() =>{
  const auth  = useAuthStore();
  const token = localStorage.getItem('token');
  if(token){
    auth.getUser();
  }
  else{
    router.push('/login');
  }
})
</script>

<template>
  <VRow class="match-height">
    <h3 class="text-title pl-3 text-primary">
        All Events
    </h3>

    <VCol cols="12">
      <AllEventsTable />
    </VCol>
  </VRow>
  
</template>
