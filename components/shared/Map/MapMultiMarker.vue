<template>
    <l-map ref="map" @ready="doSomethingOnReady" style="height: 25.6rem" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker
            v-for="(marker, index) in listlatLog"
            :key="index"
            :lat-lng="marker.latLng"
        ></l-marker>
    </l-map>
</template>

<script>
import L from "leaflet"
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet"
export default {
    name: "MultiMap",
    props: {
        listlatLog: {
            type: Array,
            default: () => []
        },
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LIcon
    },
    computed: {},

    data: function () {
        return {
            url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", //get map,
            center: L.latLng(1.29027, 103.851959),
            zoom: 2,
            attribution: '&copy; OpenStreetMap contributors',
            bounds: null
        }
    },
    created() {
        // console.log("Map listlatLog", this.listlatLog)
        // console.log("Map center",this.center);
    },
    mounted() {
        // Wait for the map to load before getting the bounds
        this.$nextTick(() => {
            const map = this.$refs.map.mapObject
            const bounds = L.latLngBounds(this.listlatLog.map((m) => m.latLng))
            map.fitBounds(bounds)
            this.center = bounds.getCenter()
        })
    },
    methods: {
        doSomethingOnReady() {
            this.$refs.map.mapObject.invalidateSize()
        },
    }
}
</script>

<style lang="scss" scoped>
</style>
