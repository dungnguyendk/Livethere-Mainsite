<template>
    <v-app>
        <v-main>
            <LandlordHeader />
            <div class="pageWrapper">
                <nuxt />
            </div>
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
<style lang="scss" scoped>
.pageWrapper {
    min-height: calc(100vh - 20rem);
}
</style>
