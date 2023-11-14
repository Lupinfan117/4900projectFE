<script setup>
import { useAuthStore } from "@/store/auth"
import { onMounted } from "vue"


const name = ref(null)
const description = ref(null)
const user = ref(null)
const rsvp = ref(null)
const event_date = ref(null)
const no_of_guests = ref(0)
const catering = ref(null)
const image = ref([])




const store = useAuthStore();

onMounted(() =>{
  store.getCatering();
  store.getUsers();
})

const save = () =>{
  const data = {
    name:name.value,
    description:description.value,
    number_of_guests:no_of_guests.value,
    catering:catering.value,
    event_date:event_date.value,
    rsvp:rsvp.value,
    user:store.user.id,
  }

  // const form = new FormData();
  // form.append('name',name.value);
  // form.append('description',description.value);
  // form.append('number_of_guests',no_of_guests.value);
  // form.append('catering',catering.value);
  // form.append('event_date',event_date.value);
  // form.append('rsvp',rsvp.value);
  // form.append('user',store.user.id);
  // form.append('image',);


  store.saveEvent(data,image.value[0]);

}
</script>

<template>
  <div>
    <VRow>
      
      <VCol cols="12">
        <!-- 👉 Multiple Column -->
        <VCard title="Create New Event">
          <VCardText>
           
  <VForm >
    <VRow>
      <VCol cols="12">
        <VTextField
          v-model="name"
          label="Event Name"
          placeholder="Event Name"
        />
      </VCol>

      <VCol cols="12">
        <v-textarea
          v-model="description"
          label="Description"
          type="text"
          placeholder="Email"
        />
      </VCol>
     
      <VCol cols="6">
        <VTextField
          v-model="event_date"
          label="Event Date"
          type="datetime-local"
          placeholder="Event Date"
        />
      </VCol>

      

      <VCol cols="6">
        <VTextField
          v-model="no_of_guests"
          label="No of Guests"
          type="number"
          placeholder="No of Guest"
        />
      </VCol>

       <VCol cols="6">

        <VSelect
        v-if="store.catering"
          v-model="catering"
          label="Catering"
          item-value="id"
          item-title="name"
          :items="store.catering"
          placeholder="Catering"
          />
      </VCol>

      <VCol cols="6">
        
        <v-autocomplete
          v-model="rsvp"
          label="RSVP"
          multiple
          v-if="store.users"
          item-title="username"
          item-value="id"
          :items="store.guests"
        />
      </VCol>
      <VCol cols="6">
        
        <v-file-input v-model="image" accept="image/*"  label="Add Image"></v-file-input>
      </VCol>

      

      

      <VCol cols="12">
        <VBtn
          @click="save"
          class="me-2"
        >
          Submit
        </VBtn>

        <VBtn
          color="secondary"
          type="reset"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
