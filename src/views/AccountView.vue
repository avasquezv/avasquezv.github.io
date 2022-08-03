<template>
  <div>
    <v-container class="grey lighten-5">
      <h2>Registra a tu Mascota</h2>
      <v-row>
        <v-col cols="12" sm="6">
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="3">
              <v-avatar
                v-if="!profile.avatar"
                size="121"
                class="pa-2 elevation-3"
              >
                <img
                  class="pa-2"
                  src="https://cdn-icons-png.flaticon.com/512/21/21645.png?w=740&t=st=1658953965~exp=1658954565~hmac=5a9a96c6fdcaee5f6738f330e77a3a5beda18d14d94d71372aa3c7b4957bb51a"
                />
              </v-avatar>
              <v-avatar
                v-if="profile.avatar"
                size="121"
                class="pa-2 elevation-3"
              >
                <img
                  class="pa-2"
                  :src="profile.avatar"
                  v-if="profile.avatar"
                  style="width: 300px; height: 300px"
                />
              </v-avatar>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row>
            <v-col>
              <template>
                <v-form
                  ref="formUp"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="agregarMascota()"
                >
                  <v-file-input
                    :rules="rules"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an avatar"
                    prepend-icon="mdi-camera"
                    label="Avatar"
                    solo
                    @change="onFileChange($event)"
                    :loading="uploading"
                  ></v-file-input>
                  <v-text-field
                    v-model="profile.ownerName"
                    :counter="20"
                    solo
                    hint="Escriba su nombre"
                    :rules="nameRules"
                    label="Nombre de usuario"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="profile.fono"
                    :counter="20"
                    solo
                    hint="Su numero telefonico sin +. Ejemplo 56912345678"
                    :rules="nameRules"
                    label="Numero de contacto del usuario"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="profile.petName"
                    :counter="20"
                    solo
                    hint="Escriba el nombre de su mascota"
                    :rules="nameRules"
                    label="Nombre de mascota"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="profile.petRaza"
                    :counter="20"
                    solo
                    hint="Raza de su mascota"
                    :rules="nameRules"
                    label="Raza Mascota"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="profile.petType"
                    :counter="20"
                    solo
                    hint="Tipo de  mascota"
                    :rules="nameRules"
                    label="Tipo de Mascota"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="profile.petAge"
                    :counter="10"
                    solo
                    hint="Edad de su mascota"
                    :rules="nameRules"
                    label="Edad Mascota"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="profile.address"
                    :counter="20"
                    solo
                    hint="Ciudad de Residencia de su mascota"
                    :rules="nameRules"
                    label="Cuidad"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="profile.coords"
                    :counter="100"
                    solo
                    hint="Encunetre su ubicacion en el mapa"
                    :rules="coordsRules"
                    label="Cordenadas"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="profile.descripcion"
                    :counter="100"
                    solo
                    hint="Escriba una pequeña descripcion de su mascota"
                    :rules="nameRules"
                    label="Descripcion"
                    required
                  ></v-text-field>
                  <v-select
                    v-model="profile.intereses"
                    :items="items"
                    solo
                    hint=" Seleccione 4 intereses de su mascota"
                    multiple
                    :rules="[(v) => !!v || 'Seleccion requerida']"
                    label="Intereses de Mascota"
                    required
                  ></v-select>

                  <v-btn
                    :disabled="!valid"
                    color="primary"
                    class="mr-4"
                    type="submit"
                  >
                    Crear Cuenta
                  </v-btn>
                  <v-btn color="primary" outlined class="mr-4" @click="editar">
                    Editar Formulario
                  </v-btn>
                </v-form>
              </template>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <h2>Encuentra tu ubicacion en el mapa</h2>
          <PickPlaceMap @pick="profile.coords = $event" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import firebase from 'firebase'
import { mapActions } from 'vuex'
import PickPlaceMap from '@/components/PickPlaceMap.vue'
export default {
  components: { PickPlaceMap },
  data: () => ({
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        'Avatar size should be less than 2 MB!'
    ],
    valid: true,
    uploading: false,
    profile: {
      ownerName: '',
      petName: '',
      petRaza: '',
      petType: '',
      petAge: '',
      address: '',
      descripcion: '',
      intereses: [],
      coords: [],
      avatar: null
    },
    nameRules: [
      (v) => !!v || 'Campo requerido',
      (v) => (v && v.length <= 100) || 'No pueden ser mas de 20 carácteres'
    ],
    coordsRules: [(v) => !!v || 'Campo requerido'],
    select: null,
    items: [
      'Correr',
      'Jugar',
      'Dormir',
      'Pasear',
      'Comer',
      'Evenbtos',
      'Cumpleaños',
      'El parque',
      'Maullar',
      'Ronrronear',
      'Cazar'
    ]
  }),
  methods: {
    ...mapActions('profiles', ['createAccount', 'getAllProfiles', 'update']),
    async onFileChange(file) {
      if (!file) return
      this.uploading = true
      try {
        const storageRef = await firebase
          .storage()
          .ref()
          .child('fotos')
          .child(uuidv4())
        await storageRef.put(file)
        this.profile.avatar = await storageRef.getDownloadURL()
      } catch (e) {
        console.error(e)
      } finally {
        this.uploading = false
      }
    },
    validate() {
      this.$refs.formUp.validate()
    },
    reset() {
      this.$refs.formUp.reset()
    },
    async agregarMascota() {
      if (this.$refs.formUp.validate()) {
        await this.createAccount({ ...this.profile })
        this.valid = false
        await this.getAllProfiles()
      }
      this.$router.push('/TimeLineView')
    },
    async editar() {
      if (this.$refs.formUp.validate()) {
        await this.update({ ...this.profile })
        this.valid = false
        await this.createAccount()
      }
      this.$router.push('/TimeLineView')
    }
  }
}
</script>

<style></style>
