import Vue from 'vue';
import { LMap, LTileLayer, LMarker, LIcon,LTooltip, LPopup } from 'vue2-leaflet';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-icon',LIcon);
Vue.component('l-tooltip',LTooltip)
Vue.component('l-popup',LPopup)