<template>
  <div class="tarjetas">
    <v-container>
      <v-row>
        <v-col>
          <SearchPet v-model="search" />
        </v-col>
      </v-row>
    </v-container>
    <v-row wrap>
      <v-col
        class="pa-2"
        md="3"
        sm="4"
        xs="12"
        v-for="(profile, $index) in filteredProfiles"
        :key="$index"
      >
        <ProfileCard :value="profile" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import ProfileCard from '@/components/ProfileCard.vue'
import SearchPet from '@/components/SearchPet.vue'

export default {
  components: { ProfileCard, SearchPet },
  data: () => ({
    search: ''
  }),
  computed: {
    ...mapState('auth', ['users']),
    ...mapState('profiles', {
      profiles: (state) => state.listado,
      loading: (state) => state.loading
    }),
    filteredProfiles() {
      if (!this.search) {
        return this.profiles
      } else {
        return this.profiles.filter((profile) =>
          profile.petType
            .toLowerCase()
            .includes(String(this.search).toLowerCase())
        )
      }
    }
  },
  mounted() {
    this.getAllProfiles()
  },
  methods: {
    ...mapActions('profiles', {
      getAllProfiles: 'getAllProfiles'
    })
  }
}
</script>
