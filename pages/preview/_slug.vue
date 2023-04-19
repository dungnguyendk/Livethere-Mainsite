<template>
    <LayoutContent v-if="pageDetails" />
</template>

<script>
import { mapState } from "vuex"
import qs from "qs"

import LayoutContent from "~/components/components/Layouts/LayoutContent.vue"
import { appSettings } from "~/app-settings"

export default {
    components: {
        LayoutContent
    },
    computed: {
        ...mapState({
            pageDetails: (state) => state.page.pageDetails,
            sections: (state) => state.page.sections
        })
    },

    head() {
        return {
            title: `Preview - ${this.pageDetails.defaultName} | ${appSettings.siteName}`
        }
    },

    methods: {
        getSectionBySlug(section, slug) {
            return section.slug === slug ? section : null
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
