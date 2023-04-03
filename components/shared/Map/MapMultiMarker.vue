<template>
    <l-map style="height: 350px" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker
            v-for="(marker, index) in markers"
            :key="index"
            :lat-lng="marker.latLng"
        ></l-marker>
    </l-map>
</template>

<script>
import { latLng } from "leaflet"
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet"

export default {
    name: "Map",
        
    computed: {
        getCenter() {
            if (this.center.length > 0) return latLng(this.center)
            return latLng([1.29027, 103.851959])
        }
    },
    created() {
        // console.log("Map listlatLog",this.listlatLog);
        // console.log("Map center",this.center);
    },
    data() {
        return {
            zoom: 13,
            center: L.latLng(45.5, -73.6),
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: "&copy; OpenStreetMap contributors",
            markers: [
                { latLng: [45.5, -73.6] },
                { latLng: [45.6, -73.7] },
                { latLng: [45.4, -73.5] }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.map {
    height: 500px;
    width: 500px;
}
</style>
