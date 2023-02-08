<template lang="html">
    <main>
        <template v-if="loggedIn">
            <LandlordPortal>
                <Marketing />
            </LandlordPortal>
        </template>
    </main>
</template>

<script>
import { appSettings } from "~/app-settings"
import Marketing from "~/components/components/Landlord/Marketing/Marketing.vue"
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"
import qs from "qs"
export default {
    components: {
        LandlordPortal,
        Marketing,
    },
    layout: 'landlord',
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
    async asyncData({ app, store }) {
        try {
            const param = qs.stringify({
                StatusFID: 0
            })
            await store.dispatch("inventories/getInventories", param)
            await store.commit("inventories/setTypeSelected", 0)
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
</script>
