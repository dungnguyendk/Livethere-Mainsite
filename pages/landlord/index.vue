<template lang="html">
    <main>
        <template v-if="loggedIn">
            <LandlordPortal>
                <LandlordDashboard />
            </LandlordPortal>
        </template>
    </main>
</template>

<script>
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import LandlordDashboard from "~/components/components/Landlord/Dashboard/LandlordDashboard.vue"
import { appSettings } from "~/app-settings"

export default {
    components: { LandlordHeader, LandlordPortal, LandlordDashboard },
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
    },
    async asyncData({ app, route, store }) {
        try {
            await store.dispatch("dashboard/getDashBoards")
        } catch (e) {
            console.log({ Error: e.message })
            return false
        }
    },
}
</script>
