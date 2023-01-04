<template>
    <v-app>
        <v-main>
            <LandlordHeader />
            <nuxt />
            <LandingFooter />
        </v-main>
    </v-app>
</template>

<script>
import LandingFooter from "~/components/shared/Footer/LandingFooter.vue"
import LandingHeader from "~/components/shared/Header/LandingHeader.vue"
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"

export default {
    components: { LandlordHeader, LandingHeader, LandingFooter },
    layout: "default"
}
</script>
