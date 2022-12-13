<template>
    <main>
        <div>
            <MarketInsights/>
        </div>
    </main>
</template>

<script>
import { mapState } from "vuex"
import MarketInsights from "~/components/components/Landlord/MarketInsights.vue"

export default {
    components: { MarketInsights },
    head: {
        title: "Landing page | Livethere"
    },

    methods: {}
}
</script>
