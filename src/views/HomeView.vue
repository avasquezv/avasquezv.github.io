<template>
  <v-layout row class="align-center h-100">
    <v-flex xs12 sm6>
      <v-card class="transparent d-flex justify-center mb-6" elevation="0">
        <v-card class="transparent" elevation="0">
          <v-img
            src="../../public/assets/img/InstaPet_logo.svg"
            width="100%"
            max-width="220"
          ></v-img>
          <h2 class="home-title">Encuentra a</h2>
          <h2 class="home-title"><span>tu amigo ideal</span></h2>
          <br />
          <v-layout gap-4>
            <v-flex shrink>
              <v-btn color="primary" dark to="/RegisterView">
                Registrate
              </v-btn>
            </v-flex>
            <v-flex shrink>
              <v-btn color="secondary" dark to="/LoginView">
                Inicia Sesión
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6>
      <v-card class="transparent" elevation="0">
        <v-img
          width="100%"
          min-width="3"
          max-width="600"
          src="../../public/assets/img/home_img.png"
          position="center"
        ></v-img>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import $Store from '@/store'

export default {
  beforeRouteEnter(to, from, next) {
    console.log('beforerouteenter')
    const activeLogin = $Store.getters['auth/activeLogin']
    if (activeLogin) {
      next('/TimeLineView')
    } else {
      next()
    }
  }
}
</script>

<style>
.home-title {
  color: #ffffff;
  font-size: 50px;
}
.home-title span {
  color: var(--v-secondary-base);
}
</style>
