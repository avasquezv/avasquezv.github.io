<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="login()"
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
                label="E-mail"
                required
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
                label="Registra tu Contraseña"
                hint="Mínimo 8 caracteres"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-flex>
            <v-flex shrink>
              <v-btn
                block
                :disabled="!valid"
                color="primary"
                @click="validate"
                type="submit"
                :loading="loading"
                >Iniciar Sesión
              </v-btn>
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
    valid: true,
    loading: false,
    credenciales: {
      password: '',
      email: ''
    },
    emailRules: [
      (v) => !!v || 'E-mail es requerido',
      (v) => /.+@.+\..+/.test(v) || 'E-mail no es valido'
    ],
    show1: false,
    rules: {
      required: (value) => !!value || 'Requerido',
      min: (v) => v.length >= 6 || 'Min 8 caracteres',
      emailMatch: () => `El Mail y Password no son correctos`
    }
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    ...mapActions('auth', ['signInWithEmailAndPassword']),
    async login() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          await this.signInWithEmailAndPassword(this.credenciales)
          this.valid = false
          this.credenciales = {
            email: '',
            password: ''
          }
        } catch (error) {
          console.error(error)
        } finally {
          this.loading = false
        }
      }
      this.$router.push('/TimeLineView')
    }
  },
  mounted() {
    this.$store.dispatch('auth/subscribeToAuthStateChange')
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
