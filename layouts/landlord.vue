<template>
    <v-app>
        <v-main>
            <LandlordHeader />
            <div class="pageWrapper">
                <nuxt />
            </div>
            <LandingFooter />
            <SuccessSnackBar :open="snackBar.show" :message="snackBar.message" />
        </v-main>
    </v-app>
</template>

<script>
import LandingFooter from "~/components/shared/Footer/LandingFooter.vue"
import LandingHeader from "~/components/shared/Header/LandingHeader.vue"
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import SuccessSnackBar from "~/components/shared/Snackbar/SuccessSnackBar.vue"
import { mapState } from "vuex"

export default {
    components: { SuccessSnackBar, LandlordHeader, LandingHeader, LandingFooter },
    layout: "default",
    computed: {
        ...mapState({
            snackBar: (state) => state.app.snackBar
        })
    }
}
</script>
<style lang="scss" scoped>
.pageWrapper {
    margin-top: 8rem;
    min-height: calc(100vh - 20rem);
    @media screen and(max-width: 1280px) {
        margin-top: 6.4rem;
    }
}
</style>
