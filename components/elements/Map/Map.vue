<template>
    <l-map ref="map" class="map" @ready="doSomethingOnReady" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker
            v-if="item.length > 0 && Array.isArray(item)"
            :lat-lng="item"
            v-for="(item, index) in listlatLog"
            :key="index"
            :icon="icon"
        >
            <l-tooltip :options="tooltipOptions">{{titleTooltip}}</l-tooltip>
        </l-marker>
    </l-map>
</template>

<script>
import L, { latLng } from "leaflet"
import { LMap, LTileLayer, LMarker, LIcon, LatLngBounds, LTooltip } from "vue2-leaflet"

export default {
    name: "Map",
    props: {
        listlatLog: {
            type: Array,
            default: () => []
        },
        zoom: {
            type: Number,
            default: 13
        },
        titleTooltip: {
            type: String,
            default: () => ""
        }
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LIcon,
        LTooltip
    },
    mounted() {
        // Wait for the map to load before getting the bounds
        this.$nextTick(() => {
            const map = this.$refs.map.mapObject
            const bounds = L.latLngBounds(this.listlatLog.map((item) => item))
            if (bounds._northEast && bounds._southWest) {
                map.fitBounds(bounds)
                this.center = bounds.getCenter()
            }
        })
    },
    data: function () {
        return {
            url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", //get map,
            attribution: "&copy; OpenStreetMap contributors",
            center: latLng([1.29027, 103.851959]),
            icon: L.icon({
                iconUrl: require("~/static/img/icons/marker_icon.svg"),
                iconSize: [32, 45],
                iconAnchor: [16, 0]
            }),
            tooltipOptions: {
                // permanent: true,
                direction: "top",
                opacity: 1,
                interactive: true
                // turn interactive on will cause bugs below
            }
        }
    },
    methods: {
        doSomethingOnReady() {
            this.$refs.map.mapObject.invalidateSize()
            this.$refs.map.mapObject._onResize()
        }
    }
}
</script>

<style lang="scss" scoped>
.map {
    height: 54.7rem;
    width: 100%;
    z-index: 1;
    @media screen and (max-width: 1024px) {
        height: 46.3rem;
    }

    @media screen and (max-width: 768px) {
        height: 34.2rem;
    }
}
</style>
