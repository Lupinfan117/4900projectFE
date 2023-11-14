<script setup>
import { useAuthStore } from '@/store/auth';
import AnalyticsDatatable from '@/views/dashboards/analytics/AnalyticsDatatable.vue'
import { onMounted } from 'vue'
import {  useRouter } from 'vue-router';
</script>

<template>
    <div class="home">
      <h1>What We Do:</h1>
      <ul class="homeList">
        <li>We create event schedules, manages attendees, sending invitations, managing RSVPs</li>
        <li>We manage vendors such as caterers, florists, photographers, and venues</li>
        <li>We help event planners keep track of what items they have and where they are located</li>
        <li>We provide features for budget tracking cost forecasting, and invoice management</li>
        <li>We provide tools for communicating with event attendees, vendors, and staff</li>
      </ul>
      <br><br>
      <div class="image-container">
        <img src="https://imgs.search.brave.com/oT1Z2qcy5GwxnCm8JRvo9nRdWNHjm99dArgZmhPoOBo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTQ5/MDQwOTgwL3Bob3Rv/L2dyb3VwLW9mLWZy/aWVuZHMtYXQtYS1w/YXJ0eS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9TmpJWlk4/enRlSVB6SXJqd3Ro/T3hGck5oSVB4TGw3/YXNNWnY2VW1rU1Jy/Zz0" alt="Picture 1">
        <img src="https://imgs.search.brave.com/vsh2bgeJRFXR8LmNwnmPTAdfRQ486HB6hqoyC7N8Mhc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjQw/MzE4Njg3L3Bob3Rv/L2dyb3VwLW9mLWZy/aWVuZHMtaGF2aW5n/LWZ1bi1hdC1hLXBh/cnR5LmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz03eWJhdkoy/UXZjZTZuMll4SnJl/cEMwZ3pXeEZzaUlK/YVAwdjF0aEVZa3pz/PQ" alt="Picture 2">
        <img src="https://imgs.search.brave.com/hJV1mjSpVcyBIGFjz7d9c5fycltE0s2T6VhatP_L0CU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg4/MTE5ODYzL3Bob3Rv/L2NlbGVicmF0aW9u/LXdpdGgtYmFsbG9v/bnMtaGF0cy1hbmQt/aG9ybnMuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPV83eUtF/T2ktUHhZRERjdklC/b19QU2lnRzkxeEpU/Q25ZUklTVTlFWUgy/WjA9" alt="Picture 3">
      </div>
      <br><br>
      <h2>Testimonials</h2>
        <ul class="homeList">
            <li>"This event management application has made organizing my events a breeze. I can easily create and manage multiple events, and keep track of all my upcoming events in one place."</li>
            <li>"As a participant, I love how easy it is to browse through a list of events, view event details, and RSVP to events I plan to attend. It's made attending events a hassle-free experience."</li>
            <li>"As a vendor, I've been able to showcase my products and services to a wider audience through this event management application. It's been a great platform to connect with event organizers and participants."</li>
            <li>"The communication features in this event management application have been a game-changer for me as an event organizer. I can easily send invitations and notifications to participants, and collaborate with other organizers, vendors, or sponsors involved in the event."</li>
            <li>"As a participant, I appreciate the RSVP feature in this event management application. It's made it easy for me to let event organizers know if I plan to attend, and has helped them make necessary arrangements accordingly."</li>
            <li>"The collaboration and communication features in this event management application have made event planning a seamless experience. I can easily coordinate with other organizers, vendors, or sponsors involved in the event, and ensure successful event planning."</li>
        </ul>
    </div>
  </template>

  <script>
  export default {
    name: 'HomePage'
    // You can add more logic here if needed
  }
  </script>

  <style>
  .home {
    text-align: center;
  }
  
  img {
    width: 300px;
    object-fit: cover;
  }

  .image-container {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }

  .homeList {
    text-align: left;
  }

  /* You can add more styles as needed */
  </style>
