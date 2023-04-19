<template>
    <main>
        <PrivacyPolicy />
    </main>
</template>

<script>
import PrivacyPolicy from "~/components/components/Page/PrivacyPolicy.vue"
import { generateLandlordsSEOMetaTags } from "~/ultilities/seo-configs"
import qs from "qs"

export default {
    components: {
        PrivacyPolicy
    },
    async asyncData({ app, store }) {
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
        try {
            const pageParams = qs.stringify({
                SiteId: 1,
                LanguageId: 1,
                Slug: "mainsite"
            })
            await store.dispatch("page/getPageDetails", pageParams)
            await store.dispatch("project/getHomePage")
            await store.dispatch("project/getLatestProject", 10)
            //
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
</script>

<style lang="scss" scoped></style>
