<template>
  <v-navigation-drawer :value="drawer" @input="SET_DRAWER" left temporary app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">INSTAPET</v-list-item-title>
        <v-list-item-subtitle> Red Social Animal </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item link to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/TimeLineView">
        <v-list-item-icon>
          <v-icon> mdi-wall</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Time-Line</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/WelcomeView">
        <v-list-item-icon>
          <v-icon> mdi-human-greeting</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Welcome</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/AccountView">
        <v-list-item-icon>
          <v-icon> mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Mi Cuenta</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/PetDetailsView">
        <v-list-item-icon>
          <v-icon> mdi-map</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Mi Ubicación</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('system', ['drawer'])
  },
  methods: {
    ...mapMutations('system', ['SET_DRAWER'])
  }
}
</script>

<style></style>
