<template lang="html">
    <main>
        <LandlordHeader />
        <template v-if="loggedIn">
            <LandlordPortal>
                <Insights />
            </LandlordPortal>
        </template>
    </main>
</template>

<script>
import LandingHeader from "~/components/shared/Header/LandingHeader.vue"
import LandingFooter from "~/components/shared/Footer/LandingFooter.vue"
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import { appSettings } from "~/app-settings"
import Insights from "~/components/components/Landlord/Insights/Insights.vue"

export default {
    components: { Insights, LandlordHeader, LandlordPortal, LandingFooter, LandingHeader },
    layout:'landlord',
    head: {
        title: `Landlord | ${appSettings.siteName}`
    },

    computed: {
        loggedIn() {
            return this.$auth.loggedIn
        }
    },
    created() {
        if (!this.loggedIn) {
            this.$router.push("/landlord/signin")
        }
    }
}
</script>
