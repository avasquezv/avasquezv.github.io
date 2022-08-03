<template>
  <v-layout align-center h-100 justify-center no-gutters>
    <v-flex sm6>
      <v-card
        class="pa-5 pa-md-12 card mx-auto"
        style="box-shadow: inherit; color: #ffffff"
      >
        <v-layout column h-100 ma-0 justify-center class="text-center">
          <v-flex shrink>
            <v-img
              src="../../public/assets/img/instapet_login_img.gif"
              width="100%"
              max-width="300"
              style="margin: auto"
            ></v-img>
            <h1>Te damos la bienvenida a</h1>
            <v-img
              src="../../public/assets/img/InstaPet_logo.svg"
              width="200"
              style="margin: auto"
            >
            </v-img>
            <br />
            <p>Por favor, sigue estas reglas</p>
          </v-flex>
          <v-flex style="text-align: left">
            <ul>
              <li>
                <h2 class="des">No finjas ser alguien más</h2>
                <p>
                  Asegúrate de que tus fotos y datos correspondad con quien eres
                  actualente.
                </p>
              </li>
              <li>
                <h2 class="des">Cuídate</h2>
                <p>No des tu información personal demasiado pronto.</p>
              </li>
              <li>
                <h2 class="des">Tomalo con calma</h2>
                <p>
                  Respeta a los demás y trátalos como te gustaría que te
                  trataran.
                </p>
              </li>
              <li>
                <h2 class="des">Toma la iniciativa</h2>
                <p>Siempre denuncia el mal comportamiento.</p>
              </li>
            </ul>
          </v-flex>
          <v-flex shrink mt-5>
            <v-btn large color="primary" type="submit" to="/AccountView"
              >Acepto
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {}
</script>

<style scoped>
.des {
  color: var(--v-secondary-base);
}
.card {
  background-color: var(--v-bg-base);
  min-width: 300px;
  max-width: 600px;
}
ul {
  list-style: none;
}
</style>
