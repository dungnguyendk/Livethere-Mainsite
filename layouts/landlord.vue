<template>
    <v-app>
        <v-main>
            <dialog-accept-cookies />
            <LandlordHeader />
            <div class="pageWrapper">
                <nuxt />
            </div>
            <LandingFooter />
            <SuccessSnackBar :open="snackBar.show" :message="snackBar.message" />
        </v-main>
        <div id="zsiqwidget"></div>
    </v-app>
</template>

<script>
import LandingFooter from "~/components/shared/Footer/LandingFooter.vue"
import LandingHeader from "~/components/shared/Header/LandingHeader.vue"
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import SuccessSnackBar from "~/components/shared/Snackbar/SuccessSnackBar.vue"
import DialogAcceptCookies from "~/components/shared/Dialog/DialogAcceptCookies.vue"
import { mapState } from "vuex"
import { APP_NAME, LANDLORDS_SEO_URL } from "~/ultilities/seo-configs"

export default {
    components: {
        SuccessSnackBar,
        LandlordHeader,
        LandingHeader,
        LandingFooter,
        DialogAcceptCookies
    },
    computed: {
        ...mapState({
            snackBar: (state) => state.app.snackBar
        }),
        customLinks() {
            const path = this.$route.path
            return [{ rel: "canonical", href: `${LANDLORDS_SEO_URL}${path}` }]
        }
    },

    head() {
        return {
            title: APP_NAME,
            link: [...this.customLinks]
        }
    }
}
</script>
<style lang="scss" scoped>
.pageWrapper {
    margin-top: 8rem;
    min-height: calc(100vh - 20rem);
    @media screen and(max-width: 1280px) {
        margin-top: 6rem;
    }
}
</style>
