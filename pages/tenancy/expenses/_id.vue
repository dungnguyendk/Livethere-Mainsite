<template lang="html">
    <main>
        <template v-if="loggedIn">
            <LandlordPortal>
                <TenancyWrapper @onBack="onBack">
                    <template slot="content">
                        <TenancyExpensesPanel />
                    </template>
                </TenancyWrapper>
            </LandlordPortal>
        </template>
    </main>
</template>

<script>
import { appSettings } from "~/app-settings"
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"
import TenancyWrapper from "~/components/components/Landlord/Tenancy/TenancyWrapper"
import TenancyExpensesPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyExpensesPanel"
import { mapState } from "vuex"
import { generateLandlordsSEOMetaTags } from "~/ultilities/seo-configs"

export default {
    components: {
        TenancyExpensesPanel,
        TenancyWrapper,
        LandlordPortal
    },
    layout: "landlord",
    head: {
        title: `Expenses | ${appSettings.siteName}`
    },

    computed: {
        ...mapState({
            tenancyID: (state) => state.inventory.tenancyID
        }),
        loggedIn() {
            return this.$auth.loggedIn
        }
    },
    methods: {
        onBack() {
            const internalID = this.tenancyID
            this.$router.push(`/landlord/tenancy/${internalID}`)
            //this.$router.go(-1)
        }
    },

    created() {
        if (!this.loggedIn) {
            this.$router.push("/landlord/signin")
        }
    },

    async asyncData({ route, store, app }) {
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
        try {
            await store.dispatch("tenancy/getTenancyDetails", route.params.id)
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
</script>
