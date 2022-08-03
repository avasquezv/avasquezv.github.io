<template>
  <v-app-bar color="primary" dark app>
    <v-app-bar-nav-icon @click="TOGGLE_DRAWER"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <img
        src="../../public/assets/img/InstaPet_logo.svg"
        alt=""
        style="width: 100px"
      />
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text v-if="activeLogin">{{ user.email }}</v-btn>
    <v-btn icon @click="exit()">
      <v-icon color="white">mdi-login</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data: () => ({}),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['activeLogin'])
  },
  methods: {
    ...mapActions('auth', ['signOut']),
    ...mapMutations('system', ['TOGGLE_DRAWER']),
    async exit() {
      await this.signOut()
      this.$router.push('/')
    }
  }
}
</script>
