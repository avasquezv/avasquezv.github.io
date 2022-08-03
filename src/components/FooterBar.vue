<template>
  <v-footer dark dense padless max-width class="footer">
    <v-card flat tile width="100%" class="text-center">
      <v-card-text class="footer">
        <v-btn v-for="icon in icons" :key="icon" class="mx-12 white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text footer">
        {{ new Date().getFullYear() }} — <strong>Insta-pet</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-instagram']
  })
}
</script>
<style>
.footer {
  background-color: #7400fc;
}
</style>
