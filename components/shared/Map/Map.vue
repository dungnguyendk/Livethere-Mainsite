<template>
    <div style="width:100%; height: 100%;">
            <l-map  :zoom="zoom" :center="getCenter">
                    <l-marker v-if="item.length > 0 && Array.isArray(item)" :lat-lng="item" v-for="(item,index) in listlatLog" :key="index">
                    </l-marker>
                <l-tile-layer :url="url"></l-tile-layer>
            </l-map>
    </div>
</template>

<script>
import {latLng} from "leaflet"
import {
    LMap, LTileLayer, LMarker,LIcon,
} from 'vue2-leaflet';

export default {
    name: "Map",
    props: {
      listlatLog: {
          type: Array,
          default: () => []
      },
      zoom: {
          type: Number,
          default: 15
      },
      center: {
          type: Array,
          default: () => []
      }
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LIcon
    },
    computed: {
        getCenter() {
            if (this.center.length > 0) return latLng(this.center)
                return latLng([1.290270,103.851959])
        }
    },
    created(){
        // console.log("Map listlatLog",this.listlatLog);
        // console.log("Map center",this.center);
    },
    data: function() {
        return {
            url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", //get map,
        };
    }
}
</script>

<style lang="scss" scoped>
.map {
    height: 500px;
    width: 500px;
}
</style>