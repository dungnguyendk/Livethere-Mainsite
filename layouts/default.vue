<template>
    <v-app>
        <v-main>
            <MainSiteHeader :source="mainSiteHeader" />
            <div class="pageWrapper">
                <nuxt />
            </div>
            <LandingFooter v-if="mainSiteFooter" :source="mainSiteFooter" />
            <SuccessSnackBar :open="snackBar.show" :message="snackBar.message" />
        </v-main>
    </v-app>
</template>

<script>
import LandingFooter from "~/components/shared/Footer/LandingFooter.vue"
import SuccessSnackBar from "~/components/shared/Snackbar/SuccessSnackBar.vue"
import { mapState } from "vuex"
import { APP_NAME, LANDLORDS_SEO_URL } from "~/ultilities/seo-configs"
import MainSiteHeader from "~/components/shared/Header/MainSiteHeader.vue"

export default {
    components: { MainSiteHeader, SuccessSnackBar, LandingFooter },
    layout: "default",
    computed: {
        ...mapState({
            snackBar: (state) => state.app.snackBar,
            pageDetails: (state) => state.page.pageDetails,
            sections: (state) => state.page.sections
        }),
        customLinks() {
            const path = this.$route.path
            return [{ rel: "canonical", href: `${LANDLORDS_SEO_URL}${path}` }]
        },
        mainSiteFooter() {
            return this.sections.length > 0
                ? this.sections.find((section) => section.slug === "mainsite-footer")
                : null
        },
        mainSiteHeader() {
            return this.sections.length > 0
                ? this.sections.find((section) => section.slug === "mainsite-header")
                : null
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
        margin-top: 6.4rem;
    }
}
</style>
