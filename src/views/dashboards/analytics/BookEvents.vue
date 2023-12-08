<script setup>
import { computed, onMounted } from 'vue'
import {API_URL} from '@/@layouts/utils'

import {useAuthStore} from '@/store/auth';
import {  useRouter } from 'vue-router';

const router = useRouter()
const headers = [
  'NAME',
  'Description',
  'Event Date',
  'Organizer',
  'Catering',
  'Invite Status',
  'Action',
]
const store = useAuthStore();
onMounted(() =>{
    store.getMyInvitations()
})

 

const event = ref('');
const fd = ref('');
const active = ref(false);
const isFd = ref(false);
const selectedEvent = ref(null);
const isCatering = ref(true);

const details = (id) =>{
  event.value = id
  active.value = true;
}

const bookedEvents = computed(() => store.invitations?.filter(x => x.invite_status == 'Booked') || [])

const formattedDate = (x) => {
      const date = new Date(x);

      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      };

      return date.toLocaleDateString("en-US", options);
    };

     const accept = async (id) =>{
     await store.accept('Accepted',id);
    }

    const cancel = async (id) =>{
     await store.cancel(id);
    }

     const feedback = async (id) =>{
        isFd.value = true;
        selectedEvent.value = id;
    //  await store.cancel(id);
    }

     const addFeedBack = async () =>{
        if(fd){
             await store.addFeedBack(fd.value,selectedEvent.value);
            isFd.value = false;

        }
    
    }

</script>

<template>
  <VCard>
    <VTable
      :headers="headers"
      :items="store.invitations"
      item-key="id"
      class="table-rounded"
      hide-default-footer
      disable-sort
    >
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header"
          >
            {{ header }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="row in bookedEvents"
          :key="row.id"
        >
          <!-- name -->

          <td>
            <div class="d-flex flex-column">
              <span class="d-block font-weight-semibold text--primary text-truncate">{{ row.event.name }}</span>
              <!-- <small>{{ row.post }}</small> -->
            </div>
          </td>

          <td v-text="row.event.description" />
          <td  >
            
            {{row.event.event_date? formattedDate(row.event.event_date):''}}
          </td>
          <td v-text="row.event.user.username" />
          <td v-text="row.event.catering.name" />
           <td  >
            
            {{row.invite_status}}
          </td>
          <!-- status -->
         
          <td  >
              <VIcon
            size="30"
            icon="mdi-dots-vertical"
            style="cursor: pointer;"
          />
            <VMenu
        activator="parent"
        width="150px"
        location="bottom end"
        offset="10px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem @click="details(row.event)"  style="cursor: pointer;">

            <VListItemTitle  class="font-weight-semibold text-sm">
              View Details
            </VListItemTitle>
          </VListItem>

          <VDivider class="my-1" />
         

          <VListItem @click="feedback(row.event.id)" style="cursor: pointer;">

            <VListItemTitle  class="font-weight-semibold text-sm ">
              Add FeedBack
            </VListItemTitle>
          </VListItem>
          
          <VListItem @click="cancel(row.id)" style="cursor: pointer;">

            <VListItemTitle  class="font-weight-semibold text-sm text-error">
              Cancel Event
            </VListItemTitle>
          </VListItem>
      
          </VList>
          </VMenu>
            
          </td>
        </tr>
      </tbody>
    </VTable>
    <v-dialog v-model="isFd" width="500">
  


    <v-card title="Add Feedback">
      <v-card-text>
       <v-textarea label="Feedback" v-model="fd"></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <VBtn
          
          class="me-2"
          @click="addFeedBack()"
        >

          Submit
        </VBtn>
        <VBtn
          color="secondary"
          type="reset"
          variant="tonal"
          @click="selectedEvent=null;fd='';isFd=false"
        >
          Cancel
        </VBtn>
      </v-card-actions>
    </v-card>
  
</v-dialog>
    <v-dialog v-model="active" width="500">

  <template v-slot:default>
      <VCard title="Event Detail" class="px-3">
    <VRow>
    <VCol
      cols="12"
     
    >
     <VCardItem>
          <v-img v-if="event.image" style="height: 200px;object-fit: contain;" :src="`${API_URL+event.image}`"/>
          <div v-else class="d-flex justify-center" style="height: 200px; width: 100%;">
            <div class="d-flex align-center justify-center" style="height: 200px; width: 300px;background-color: rgb(233, 233, 233);">
              No image
            </div>
          </div>
        </VCardItem>
        <VCardItem>
          <VCardTitle>{{ event.name }}</VCardTitle>
        </VCardItem>

        <VCardText>
          <span class="font-weight-bold mb-1">
            Discription: 
          </span>
          {{event.description}}
        </VCardText>

         <VCardText>
          <span class="font-weight-bold mb-1">
            Guest: 
          </span>
         {{ event.number_of_guests}}
        </VCardText>

         <VCardText>
          <span class="font-weight-bold mb-1">
            Event Date 
          </span>
           {{event.event_date? formattedDate(event.event_date):''}}
        </VCardText>

         

        <VCardActions>
          <VBtn  @click="isCatering = !isCatering">
            Catering
                    </VBtn>
                    

          <VSpacer />

          <VBtn
            icon
            size="small"
            @click="isCatering = !isCatering"
          >
            <VIcon :icon="isCatering  ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
          </VBtn>
        </VCardActions>

        <VExpandTransition>
          <div v-show="isCatering">
           <VCardText>
          <span class="font-weight-bold mb-1">
            Name
          </span>
          {{ event.catering.name }}
        </VCardText>
          <VCardText>
          <span class="font-weight-bold mb-1">
            Description
          </span>
             {{ event.catering.description }}
        </VCardText>

        <VCardText class="font-weight-bold mb-1">
          
          Food Items
        </VCardText>
        <template v-for="(data,idx) in event.catering.foodItems" :key="idx">

       
         <VCardText>
          <div>

            <span class="font-weight-bold mb-1">
              Name : 
            </span>
            {{data.name}}
          </div>
          <div>

            <span class="font-weight-bold mb-1">
              Description : 
            </span>
            {{data.description}}
          </div>
        </VCardText>
        
         <VDivider class="my-1" />
          </template>
          </div>
        </VExpandTransition>
    </VCol>
    
    <!-- 👉 Apple iPhone 11 Pro -->
    
</VRow>


      <v-card-actions>
        <v-spacer></v-spacer>
         <VBtn
          
           @click="active= false"
        >
          Close Dialog
        </VBtn>
       
      </v-card-actions>
    </VCard>
  </template>
</v-dialog>
  </VCard>
</template>
