<template>
  <v-form
    ref="formUp"
    v-model="valid"
    lazy-validation
    @submit.prevent="crearCuenta()"
    class="d-contents"
  >
    <v-layout align-center h-100 justify-center no-gutters>
      <v-flex sm6>
        <v-card class="pa-5 pa-md-12 card mx-auto" style="box-shadow: inherit">
          <v-layout column h-100 ma-0 justify-center>
            <v-flex shrink>
              <v-btn block color="#7400fc" style="box-shadow: inherit">
                <router-link to="/">
                  <v-img
                    class="my-auto"
                    src="../../public/assets/img/InstaPet_logo.svg"
                    width="200"
                  ></v-img>
                </router-link>
              </v-btn>
            </v-flex>
            <v-flex shrink my-5>
              <p align="center" style="color: #ffffff">
                Red social
                <v-icon color="pink darken-1">mdi-heart</v-icon>
                para mascotas
              </p>
            </v-flex>
            <v-flex shrink>
              <v-text-field
                solo
                v-model="credenciales.email"
                :rules="emailRules"
                label="Correo electrónico"
                required
                :disabled="loading"
              ></v-text-field>
            </v-flex>
            <v-flex shrink>
              <v-text-field
                solo
                v-model="credenciales.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Contraseña"
                persistent-hint
                hint="Mínimo 8 caracteres"
                counter
                @click:append="show1 = !show1"
                :disabled="loading"
              ></v-text-field>
            </v-flex>
            <v-flex shrink mt-6>
              <v-layout gap-4 row ma-0>
                <v-flex>
                  <v-btn
                    block
                    :disabled="!valid"
                    color="primary"
                    class="mr-4"
                    @click="validate"
                    type="submit"
                    :loading="loading"
                  >
                    Registrar
                  </v-btn>
                </v-flex>
                <v-flex>
                  <v-btn
                    dark
                    block
                    color="secondary"
                    to="/"
                    :disabled="loading"
                  >
                    Salir
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    loading: false,
    valid: true,
    credenciales: {
      password: '',
      email: ''
    },
    emailRules: [
      (v) => !!v || 'E-mail es requerido',
      (v) => /.+@.+\..+/.test(v) || 'E-mail no valido'
    ],
    show1: false,
    rules: {
      required: (value) => !!value || 'Este campo es requerido',
      min: (v) => v.length >= 8 || 'Mínimo 8 carácteres',
      emailMatch: () => `El correo electrónico no es válido`
    }
  }),
  methods: {
    ...mapActions('auth', ['createUserWithEmailAndPassword']),
    async crearCuenta() {
      if (this.$refs.formUp.validate()) {
        try {
          this.loading = true
          await this.createUserWithEmailAndPassword(this.credenciales)
        } catch (e) {
          console.error(e)
        } finally {
          this.loading = false
        }
      }
      this.$router.replace('/WelcomeView')
    },
    validate() {
      this.$refs.formUp.validate()
    }
  }
}
</script>

<style scoped>
.card {
  background-color: var(--v-bg-base);
  height: 50vh;
  min-height: 350px;
  max-height: 500px;
  min-width: 300px;
  max-width: 500px;
}
</style>
