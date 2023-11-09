import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../plugins/axios';


export const useAuthStore = defineStore('auth', () => {
   const state = ref(null);
   const user  = ref(null);
   const snackbar = ref(false);
   const text = ref(null);
   const color = ref(null);

   const events = ref(null);

   const router = useRouter();
   
  const isLoggedIn = computed(() => !!state.value.access)
  async function login(email,pass) {

    try{
      const res = await axios.post('/login/',{username:email,password:pass});
      state.value = res.data
      localStorage.setItem('token',state.value.access)
      localStorage.setItem('refresh',state.value.refresh)
      getUser();
      showSnack('Login Success','success');
      router.push('/');
    }
    catch (err) {
      console.log(err)
      showSnack(err,'error');
    }
  }

  function showSnack(val1,val2){
    text.value = val1;
    color.value = val2;
    snackbar.value = true;
  }

  async function getUser() {
    try{

      const res = await axios.get('/user/');
      console.log(res,'user');
      user.value = res.data
    }
    catch (err) {
      console.log(err);
    }
  }

  async function signup(data) {
   try{
      const res = await axios.post('/register/',data);
      state.value = res.data
      localStorage.setItem('token',state.value.access)
      localStorage.setItem('refresh',state.value.refresh)
      router.push('/login');
    }
    catch (err) {
      console.log(err)
    }
  };


   async function getEvents(){
    try{

      const res = await axios.get('/event');
      events.value = res.data.data;
      console.log(events.value);
    }
    catch(err) {
      
    }
   }

   const catering = ref(null);
   const users = ref(null);

   async function getCatering(){
    try{

      const res = await axios.get('/catering');
      catering.value = res.data.data;
      console.log(catering);
    }
    catch (err) {
      console.log(err);
    }
 
   }

   async function getUsers(){
    try{

      const res = await axios.get('/users/');
      users.value = res.data.data;
      console.log(users);
    }
    catch (err) {
      console.log(err);
    }
 
   }

   async function saveEvent(data){
    try{

      const res = await axios.post('/event',data);
      console.log(res.data);
      showSnack('Event Saved Successfully','success');
      router.push('/');
    }
    catch (err) {
      showSnack(err,'error');
    }
 
   }

  return {state, login, isLoggedIn,signup ,getUser,snackbar,text,color,showSnack,getEvents,events,user,getUsers,getCatering,users,catering,saveEvent}
})