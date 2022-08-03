<template>
  <div ref="map" class="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN

export default {
  data: () => ({
    map: null,
    marker: null
  }),
  mounted() {
    this.marker = new mapboxgl.Marker()

    this.map = new mapboxgl.Map({
      container: this.$refs.map,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-24, 42],
      zoom: 1,
      projection: 'globe'
    })

    this.map.on('style.load', () => {
      this.map.setFog({})
    })

    this.map.on('click', ($event) => {
      this.marker.setLngLat($event.lngLat)
      this.marker.addTo(this.map)
      this.$emit('pick', $event.lngLat)
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

<style scoped>
.map {
  height: 500px;
  width: 100%;
}
</style>
