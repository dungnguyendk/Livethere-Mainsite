<template>
    <div>
        <LayoutContent v-if="pageDetails && pageDetails.isPublished" />
    </div>
</template>

<script>
import { mapState } from "vuex"
import qs from "qs"

import LayoutContent from "~/components/components/Layouts/LayoutContent.vue"
import { appSettings } from "~/app-settings"
import LandingCallToAction from "~/components/components/Layouts/SharedLayout/LandingCallToAction.vue"

export default {
    components: {
        LayoutContent,
        LandingCallToAction
    },
    computed: {
        ...mapState({
            pageDetails: (state) => state.page.pageDetails,
            sections: (state) => state.page.sections
        })
    },
    head() {
        return {
            title: `${this.pageDetails.defaultName} | ${appSettings.siteName}`
        }
    },

    async asyncData({ store, params }) {
        try {
            const { slug } = params
            const pageParams = qs.stringify({
                siteId: 1,
                languageId: 1,
                slug: slug
            })
            await store.dispatch("page/getPageDetails", pageParams)
        } catch (e) {}
    }
}
</script>
