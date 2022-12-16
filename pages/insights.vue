<template>
    <main>
        <MarketInsights/>
    </main>
</template>

<script>
import { mapState } from "vuex"
import MarketInsights from "~/components/components/MarketInsights/MarketInsights.vue";

export default {
    components: {MarketInsights},

    head: {
        title: "Landing page | Livethere"
    },

    methods: {}
}
</script>
