<template>
  <div class="here-map">
    <div
      ref="map"
      :style="{ width: width + '%', height: height }"
      style="float: left"
    ></div>
  </div>
</template>

<script>
import { HERE_KEY } from '~/shared/config'

export default {
  name: 'HereMap',
  props: {
    lat: String,
    lng: String,
    width: String,
    height: String,
  },
  data() {
    return {
      map: {},
      platform: {},
      router: {},
      geocoder: {},
      directions: [],
    }
  },
  created() {
    // this.route()
  },
  mounted() {},
  methods: {
    route(start, finish) {
      const platform = new H.service.Platform({
        apikey: HERE_KEY,
      })
      const targetElement = this.$refs.map
      // Get the default map types from the platform object:
      const defaultLayers = platform.createDefaultLayers()
      // Instantiate the map:
      const map = new H.Map(targetElement, defaultLayers.vector.normal.map, {
        zoom: 4,
        center: { lat: 52.51, lng: 13.4 },
      })
      // Create the parameters for the routing request:
      const routingParameters = {
        mode: 'fastest;car',
        waypoint0: `geo!${start}`,
        waypoint1: `geo!${finish}`,
        // To retrieve the shape of the route we choose the route
        // representation mode 'display'
        representation: 'display',
      }

      // Define a callback function to process the routing response:
      const onResult = function (result) {
        let route, routeShape, startPoint, endPoint, linestring
        if (result.response.route) {
          // Pick the first route from the response:
          route = result.response.route[0]
          // Pick the route's shape:
          routeShape = route.shape

          // Create a linestring to use as a point source for the route line
          linestring = new H.geo.LineString()

          // Push all the points in the shape into the linestring:
          routeShape.forEach(function (point) {
            const parts = point.split(',')
            linestring.pushLatLngAlt(parts[0], parts[1])
          })

          // Retrieve the mapped positions of the requested waypoints:
          startPoint = route.waypoint[0].mappedPosition
          endPoint = route.waypoint[1].mappedPosition

          // Create a polyline to display the route:
          const routeLine = new H.map.Polyline(linestring, {
            style: { strokeColor: 'blue', lineWidth: 3 },
          })

          // Create a marker for the start point:
          const startMarker = new H.map.Marker({
            lat: startPoint.latitude,
            lng: startPoint.longitude,
          })

          // Create a marker for the end point:
          const endMarker = new H.map.Marker({
            lat: endPoint.latitude,
            lng: endPoint.longitude,
          })

          // Add the route polyline and the two markers to the map:
          map.addObjects([routeLine, startMarker, endMarker])

          // Set the map's viewport to make the whole route visible:
          map
            .getViewModel()
            .setLookAtData({ bounds: routeLine.getBoundingBox() })
        }
      }

      // Get an instance of the routing service:
      const router = platform.getRoutingService()

      // Call calculateRoute() with the routing parameters,
      // the callback and an error callback function (called if a
      // communication error occurs):
      router.calculateRoute(routingParameters, onResult, function (error) {
        alert(error.message)
      })
    },
  },
}
</script>

<style scoped></style>
