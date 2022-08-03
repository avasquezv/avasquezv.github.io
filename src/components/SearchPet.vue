<template>
  <v-toolbar dark color="secondary">
    <v-toolbar-title>Buscador por Tipo de Mascota</v-toolbar-title>
    <v-autocomplete
      :loading="loading"
      :items="items"
      :value="value"
      @input="$emit('input', $event)"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      hide-details
      label="Qué mascota estas buscando?"
      solo-inverted
    ></v-autocomplete>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      search: null,
      select: null,
      items: ['Perro', 'Gato', 'Conejo', 'Hamster', 'Loro']
    }
  },
  props: ['value'],
  computed: {
    ...mapState('profiles', {
      profile: (state) => state.listado
    })
  },

  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val)
    }
  },
  methods: {
    ...mapActions('profiles', ['getAllProfiles'])
  }
}
</script>

<style></style>
