<template>
    <main>
        <HomeBannerSection />
        <HomeSearch />
        <HomeIntroSection />
        <HomePopularListingSection />
        <HomeLatestProjectsSection />
        <HomeCTASection />
    </main>
</template>

<script>
import HomeBannerSection from "~/components/components/Section/Home/HomeBannerSection.vue"
import HomeSearch from "~/components/components/Section/Home/HomeSearch.vue"
import HomeIntroSection from "~/components/components/Section/Home/HomeIntroSection.vue"
import HomePopularListingSection from "~/components/components/Section/Home/HomePopularListingSection.vue"
import HomeLatestProjectsSection from "~/components/components/Section/Home/HomeLatestProjectsSection.vue"
import HomeCTASection from "~/components/components/Section/Home/HomeCTASection.vue"
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import LocationDistrictForm from "~/components/components/Section/components/Form/LocationDistrictForm.vue"
import LocationMRTForm from "~/components/components/Section/components/Form/LocationMRTForm.vue"
import { generateLandlordsSEOMetaTags } from '~/ultilities/seo-configs'
import { httpEndpoint } from "~/services/https/endpoints"
import { appSettings, projectSettings } from "~/app-settings"
// import { POPULAR_LISTING, LATEST_PROJECT } from "~/ultilities/contants/dummy-data"
export default {
    name: "LiveThereMainSiteHome",
    components: {
        HomeBannerSection,
        HomeSearch,
        HomeIntroSection,
        HomePopularListingSection,
        HomeLatestProjectsSection,
        HomeCTASection,
    },
    data() {
        return {
           
        }
    },
    methods: {
       
    }, 
    async asyncData({app, store}){
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
        try{
            // const params = 10;
            await store.dispatch("project/getHomePage")
            await store.dispatch("project/getLatestProject",10)

            
        }catch(e){
            console.log({Error: e.message})
        }
    }
}
</script>

<style lang="scss" scoped>
</style>