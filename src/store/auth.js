import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../plugins/axios';


export const useAuthStore = defineStore('auth', () => {
   const state = ref(null);
   const user  = ref(null);
   const snackbar = ref(false);
   const text = ref(null);
   const color = ref(null);

   const sEvent = ref(null);

   const events = ref(null);
   const testimonials = ref(null);
   const invitations = ref(null);

   const router = useRouter();
   
  const isLoggedIn = computed(() => !!state.value.access)
  async function login(email,pass) {

    try{
      const res = await axios.post('/login/',{username:email,password:pass});
      state.value = res.data
      localStorage.setItem('token',state.value.access)
      localStorage.setItem('refresh',state.value.refresh)
      showSnack('Login Success','success');
      getUser().then(() =>{
        console.log(user.value.type, 'type')
        if (user.value.type == 'Guest') {

          router.push('/guest');
        }
        else {
          router.push('/');
        }
      });
      
      
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
      localStorage.setItem('type', user.value.type)
      
    }
    catch (err) {
      console.log(err);
    }
  }

  async function Delete(id) {
    try {

      const res = await axios.delete(`/event/${id}`);
      showSnack('Event Deleted Successfully', 'success');
      getEvents();

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

  async function getAllEvents() {
    try {

      const res = await axios.get('/all-events');
      events.value = res.data.data;
      console.log(events.value);
    }
    catch (err) {
      console.log(err);
    }
  }


  async function getTestimonials(id) {
    try {

      const res = await axios.get(`/feedback/${id}/`);
      testimonials.value = res.data;
    }
    catch (err) {
      console.log(err);
    }
  }


   async function getEvents(){
    try{

      const res = await axios.get('/event');
      events.value = res.data.data;
      console.log(events.value);
    }
    catch(err) {
      console.log(err);
    }
   }

  async function getEvent() {
    try {

      const res = await axios.get(`/event/${sEvent.value}/`);
      return res.data;
    }
    catch (err) {
      console.log(err);
    }
  }

  async function getMyInvitations() {
    try {

      const res = await axios.get('/invitations/user/');
      invitations.value = res.data;
      console.log(invitations.value);
    }
    catch (err) {
      console.log(err);
    }
  }

  async function accept(val, id) {
    try {
      const data = {
        invite_status: val
      }
      const res = await axios.patch(`/update-status/${id}/`, data);
      showSnack('Status change to Accepted', 'success');
      await getMyInvitations()
    }
    catch (err) {
      console.log(err);
    }
  }

  async function invite(users, id) {
    try {
      const data = {
        users: users
      }
      const res = await axios.post(`/invites/${id}/`, data);
      showSnack('Invitation successfully sent', 'success');
      await getMyInvitations()
    }
    catch (err) {
      console.log(err);
    }
  }

  async function book(id) {
    try {
      const data = {
        user: user.value.id,
      }
      const res = await axios.post(`/book/${id}/`, data);
      showSnack('Event Booked Successfully', 'success');
    }
    catch (err) {
      showSnack('Event Already booked', 'secondary');
      console.log(err);
    }
  }

  async function reject(val, id) {
    try {
      const data = {
        invite_status:val
      }
      const res = await axios.patch(`/update-status/${id}/`,data);
      showSnack('Status change to Rejected', 'success');
      await getMyInvitations()
    }
    catch (err) {
      console.log(err);
    }
  }

  async function addFeedBack(val, id) {
    try {
      const data = {
        content: val,
        user:user.value.id,
        event:id
      }
      const res = await axios.post(`/feedback`, data);
      showSnack('Feedback added Successfully', 'success');
    }
    catch (err) {
      console.log(err);
    }
  }

  async function cancel(id) {
    try {
   
      const res = await axios.delete(`/invitation/${id}/`);
      showSnack('Booking Cancel Successfully', 'success');
      await getMyInvitations()
      
    }
    catch (err) {
      console.log(err);
    }
  }

  async function getEventInvitations(id) {
    try {

      const res = await axios.get(`/invitations/event/${id}/`);
      invitations.value = res.data;
      console.log(invitations.value);
    }
    catch (err) {
      console.log(err);
    }
  }

   const catering = ref(null);
   const users = ref(null);

   const guests = computed(() => users.value.filter(u => u.type == 'Guest') || [])

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

   function search(val) {
    if(val){
      const lowerCaseEventName = val.toLowerCase();
      events.value = events.value.filter(event =>
        event.name.toLowerCase().includes(lowerCaseEventName)
      );
    }
    else{
      getEvents();
    }

  }

  

   async function saveEvent(data,img){
    try{

      const res = await axios.post('/event',data);
      console.log(res.data);
      if(img && res.data.id){
      const form = new FormData();
      form.append('image',img);
      const imr = await axios.post(`/upload/${res.data.id}/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',

        },
      });
    }
      showSnack('Event Saved Successfully', 'success');
      router.push('/');
    }
    catch (err) {
      showSnack(err,'error');
    }
 
   }

  async function editEvent(data) {
    try {

      const res = await axios.put(`/event/${sEvent.value}/`, data);
     
      showSnack('Event Saved Successfully', 'success');
      router.push('/');
    }
    catch (err) {
      showSnack(err, 'error');
    }

  }

  return { state, guests, editEvent, sEvent, getEvent, invite, testimonials, getTestimonials, addFeedBack, book, cancel, getAllEvents, search,accept,reject, invitations,getMyInvitations,getEventInvitations, login, isLoggedIn, signup, Delete ,getUser,snackbar,text,color,showSnack,getEvents,events,user,getUsers,getCatering,users,catering,saveEvent}
})