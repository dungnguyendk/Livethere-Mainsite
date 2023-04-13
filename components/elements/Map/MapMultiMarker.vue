<template>
    <l-map ref="map" @ready="doSomethingOnReady" style="height: 25.6rem" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        
        <l-marker
            v-for="(marker, index) in listlatLog"
            :key="index"
            :lat-lng="marker.latLng"
            :icon="icon"
        >
        <l-popup>
            <v-card
                >
                <v-img v-if="objectLocation[index].thumbnail"
                    :src="objectLocation[index].thumbnail"
                />
                <v-img v-else src="https://fakeimg.pl/574x320/?text=No%20Image" />
                <v-card-title>{{ objectLocation[index].buildingName }}</v-card-title>
                <v-card-text>
                    <div class="text-subtitle">
                        {{ objectLocation[index].buildingAddress }}
                    </div>
                    <div>S$ {{ objectLocation[index].rentPrice }}/month</div>
                    <!-- <div>S$ {{ priceFormat }}/month</div> -->
                </v-card-text>
                </v-card>
        </l-popup>
        </l-marker>
    </l-map>
</template>

<script>
import L  from "leaflet"
import { LMap, LTileLayer, LMarker, LIcon, latLngBounds, LPopup } from "vue2-leaflet"
import { convertNumberToCommas } from "~/ultilities/helpers"
export default {
    name: "MapMultiMarker",
    props: {
        listlatLog: {
            type: Array,
            default: () => []
        },
        objectLocation : {
            type: Array,
            default: () => {}
        }
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LIcon,
        latLngBounds,
        LPopup
    },
    computed: {
        // location() {
        //     return this.objectLocation.map((item) => ({
        //         latLng: [parseFloat(item.location.lat), parseFloat(item.location.lon)]
        //     }))
        // },
        priceFormat() {
            return convertNumberToCommas(this.objectLocation[this.iDex].rentPrice)
        },
    },

    data: function () {
        return {
            url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", //get map,
            center: L.latLng(1.29027, 103.851959),
            zoom: 2,
            attribution: '&copy; OpenStreetMap contributors',
            bounds: null,
            icon: L.icon({
                iconUrl: require("~/static/img/icons/marker_icon.svg"),
                iconSize: [32, 45],
                iconAnchor: [16, 0]
            }),
            tooltipOptions: {
                // permanent: true,
                direction: "top",
                opacity: 1,
                interactive: true,
                // turn interactive on will cause bugs below
            },
        }
    },
    created() {
        // console.log("Map listlatLog", this.listlatLog)
        console.log("Map return objectLocation",this.objectLocation);
        // console.log("Map return objectLocation",this.objectLocation.location);
    },
    mounted() {
        // Wait for the map to load before getting the bounds
        this.$nextTick(() => {
            const map = this.$refs.map.mapObject
            const bounds = L.latLngBounds(this.listlatLog.map((m) => m.latLng))
            if(bounds._northEast && bounds._southWest) {
                map.fitBounds(bounds)
                this.center = bounds.getCenter()
            }
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
.leaflet-tooltip{
    padding: 0;
}
.v-card {
    max-width: 25rem;
    margin: -7px;
    border: 0;
    box-shadow: none;
}
.v-card__text {
    padding: .8rem .8rem 1.6rem;
    font-size: 14px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
    > * {
        white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
    max-width: 100%;
    overflow: hidden;
    }
}
.v-card__title {
    padding: .8rem;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
    font-weight: bold;
}
.text-subtitle {
    margin-bottom: 1.2rem;
}
</style>
