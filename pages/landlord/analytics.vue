<template lang="html">
    <main>
        <LandlordHeader />
        <template v-if="loggedIn">
            <LandlordPortal>
                <Analytics />
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
import Analytics from "~/components/components/Landlord/Analytics/Analytics.vue"

export default {
    name: "landlord",
    components: { Analytics, LandlordHeader, LandlordPortal, LandingFooter, LandingHeader },
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
