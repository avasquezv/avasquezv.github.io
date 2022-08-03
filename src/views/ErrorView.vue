<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <img
          src="../../public/assets/img/error_404.png"
          alt="error_404_img"
          class="error_404"
        />
        <h1 class="fs-3 white--text">
          Opps! <br />
          Pagina no encontrada
        </h1>
        <h2 class="lead white--text mb-10">Por favor revisa bien la url</h2>
        <router-link to="/" class="btn-pink white--text"
          >Volver al home</router-link
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {}
</script>

<style>
.error_404 {
  width: 100%;
  max-width: 700px;
}
.btn-pink {
  background-color: #fc5374;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  margin: 40px;
}
</style>
