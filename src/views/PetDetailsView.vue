<template>
  <v-container style="background-color: #7400fc">
    <div>
      <h2 class="home-title">Parques y Plazas</h2>
      <div id="map"></div>
      <FooterBar />
    </div>
  </v-container>
</template>

<script>
import FooterBar from '@/components/FooterBar.vue'
import { mapState, mapActions } from 'vuex'
import mapboxgl from 'mapbox-gl'
import { v4 as uuidv4 } from 'uuid'

mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN

export default {
  components: { FooterBar },
  data: () => ({
    map: null,
    marker: null,
    monumentsMarkers: []
  }),
  computed: {
    ...mapState('monuments', {
      monuments: (state) => state.list
    })
  },
  watch: {
    monuments: {
      immediate: true,
      handler() {
        this.monuments.forEach((monument) => {
          const $marker = document.createElement('div')
          $marker.id = uuidv4()
          $marker.classList.add('marker')
          $marker.style.backgroundImage = `url('${monument.image}')`

          const popup = new mapboxgl.Popup({ offset: 25 }).setText(
            monument.description
          )

          new mapboxgl.Marker($marker)
            .setLngLat(monument)
            .setPopup(popup)
            .addTo(this.map)
        })
      }
    }
  },
  methods: {
    ...mapActions('monuments', {
      getAllMonumets: 'getAll'
    })
  },
  created() {
    this.getAllMonumets()
  },
  mounted() {
    this.marker = new mapboxgl.Marker()

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-24, 42],
      zoom: 1,
      projection: 'globe'
    })

    this.map.on('style.load', () => {
      this.map.setFog({})
    })

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
      })
    )
  }
}
</script>

<style>
#map {
  height: 60vh;
  width: 80vw;
}
.home-title {
  color: #f3bb2d;
  font-size: 50px;
  text-align: center;
}
.marker {
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.mapboxgl-popup {
  max-width: 200px;
}
</style>
