<script setup>
import { onMounted } from 'vue'
import { API_URL } from '@/@layouts/utils'

import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const headers = ['NAME', 'Description', 'Event Date', 'No of Guest', 'Catering', 'Status', 'Action']
const rsHeaders = ['NAME', 'Email', 'Invite Status']
const store = useAuthStore()
onMounted(() => {
  store.getAllEvents()
})

const event = ref('')
const active = ref(false)
const isCatering = ref(true)
const isRsvp = ref(false)

const details = val => {
  event.value = val
  store.getEventInvitations(val.id).then(() => {
    active.value = true
  })
}

const formattedDate = x => {
  const date = new Date(x)

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }

  return date.toLocaleDateString('en-US', options)
}

const book = id => {
  store.book(id)
}

const getStatus = dateString => {
  // Parse the input date string
  const inputDate = new Date(dateString)

  // Get the current date and time
  const currentDate = new Date()

  // Compare the input date with the current date
  if (inputDate > currentDate) {
    return 'Active'
  } else {
    return 'InActive'
  }
}
</script>

<template>
  <VCard>
    <VTable
      :headers="headers"
      :items="store.events"
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
          v-for="row in store.events"
          :key="row.id"
        >
          <!-- name -->

          <td>
            <div class="d-flex flex-column">
              <span class="d-block font-weight-semibold text--primary text-truncate">{{ row.name }}</span>
              <!-- <small>{{ row.post }}</small> -->
            </div>
          </td>

          <td v-text="row.description" />
          <td>
            {{ row.event_date ? formattedDate(row.event_date) : '' }}
          </td>
          <td v-text="row.number_of_guests" />
          <td v-text="row.catering.name" />
          <td>
            {{ row.event_date ? getStatus(row.event_date) : '' }}
          </td>
          <!-- status -->

          <td>
            <VIcon
              size="30"
              icon="mdi-dots-vertical"
              style="cursor: pointer"
            />
            <VMenu
              activator="parent"
              width="150px"
              location="bottom end"
              offset="10px"
            >
              <VList>
                <!-- 👉 User Avatar & Name -->
                <VListItem
                  @click="details(row)"
                  style="cursor: pointer"
                >
                  <VListItemTitle class="font-weight-semibold text-sm"> View Details </VListItemTitle>
                </VListItem>

                <VDivider class="my-1" />
                <VListItem
                  @click="book(row.id)"
                  style="cursor: pointer"
                >
                  <VListItemTitle class="font-weight-semibold text-sm text-success"> Book Event </VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </td>
        </tr>
      </tbody>
    </VTable>
    <v-dialog
      v-model="active"
      width="500"
    >
      <template v-slot:default>
        <VCard
          title="Event Detail"
          class="px-3"
        >
          <VRow>
            <VCol cols="12">
              <VCardItem>
                <v-img
                  v-if="event.image"
                  style="height: 200px; object-fit: contain"
                  :src="`${API_URL + event.image}`"
                />
                <div
                  v-else
                  class="d-flex justify-center"
                  style="height: 200px; width: 100%"
                >
                  <div
                    class="d-flex align-center justify-center"
                    style="height: 200px; width: 300px; background-color: rgb(233, 233, 233)"
                  >
                    No image
                  </div>
                </div>
              </VCardItem>
              <VCardItem>
                <VCardTitle>{{ event.name }}</VCardTitle>
              </VCardItem>

              <VCardText>
                <span class="font-weight-bold mb-1"> Discription: </span>
                {{ event.description }}
              </VCardText>

              <VCardText>
                <span class="font-weight-bold mb-1"> Guest: </span>
                {{ event.number_of_guests }}
              </VCardText>

              <VCardText>
                <span class="font-weight-bold mb-1"> Event Date </span>
                {{ event.event_date ? formattedDate(event.event_date) : '' }}
              </VCardText>

              

              <VCardActions>
                <VBtn @click="isCatering = !isCatering"> Catering </VBtn>

                <VSpacer />

                <VBtn
                  icon
                  size="small"
                  @click="isCatering = !isCatering"
                >
                  <VIcon :icon="isCatering ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
                </VBtn>
              </VCardActions>

              <VExpandTransition>
                <div v-show="isCatering">
                  <VCardText>
                    <span class="font-weight-bold mb-1"> Name </span>
                    {{ event.catering.name }}
                  </VCardText>
                  <VCardText>
                    <span class="font-weight-bold mb-1"> Description </span>
                    {{ event.catering.description }}
                  </VCardText>

                  <VCardText class="font-weight-bold mb-1"> Food Items </VCardText>
                  <template
                    v-for="(data, idx) in event.catering.foodItems"
                    :key="idx"
                  >
                    <VCardText>
                      <div>
                        <span class="font-weight-bold mb-1"> Name : </span>
                        {{ data.name }}
                      </div>
                      <div>
                        <span class="font-weight-bold mb-1"> Description : </span>
                        {{ data.description }}
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
            <VBtn @click="active = false"> Close Dialog </VBtn>
          </v-card-actions>
        </VCard>
      </template>
    </v-dialog>
  </VCard>
</template>
