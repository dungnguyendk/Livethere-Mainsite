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
            const responsePopularListing = await app.$axios.$get(`${httpEndpoint.projects.getPopularListing}`)
            // const responsePopularListing = await app.$axios.$get(`http://vnapi.asiaesolutions.com/cmspublic/${httpEndpoint.projects.getPopularListing}`)

            const responseLatestProject = await app.$axios.$get(`${httpEndpoint.projects.getListings}?page=1&perPage=10`)
            // this.$router.push(`/home?${params}`)
            // console.log("responsePopularListing :", responsePopularListing) ;
            // console.log("responseLatestProject :", responseLatestProject);
            if(responsePopularListing){
                await store.commit("project/setPopularListings", responsePopularListing)
            }else {
                await store.commit("project/setPopularListings", [])
            }

            if(responseLatestProject){
                await store.commit("project/setLatestProjects", responseLatestProject.data)
            }else{
                await store.commit("project/setLatestProjects", [])
            }
            
        }catch(e){
            console.log({Error: e.message})
        }
    }
}
</script>

<style lang="scss" scoped>
</style>