<template>
    <main>
        <ProjectDetail/>
    </main>
</template>

<script>
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import LandingFooter from "~/components/shared/Footer/LandingFooter.vue"
import ProjectDetail from "~/components/components/Projects/ProjectDetail.vue"
import { generateLandlordsSEOMetaTags } from '~/ultilities/seo-configs'
import { httpEndpoint } from "~/services/https/endpoints"
import { appSettings } from "~/app-settings"
import { PROJECT_DETAILS, HOME_AGENT_INFO,  POPULAR_LISTING } from "~/ultilities/contants/dummy-data"
export default {
    name: "LiveThereMainSiteDetails",
    components: { LandlordHeader, LandingFooter, ProjectDetail },
    head: {
        title: "Livethere"
    },
    async asyncData({app, params, store}){
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
        const projectDetails = PROJECT_DETAILS
        const homeAgent = HOME_AGENT_INFO
        const mostViewedListing = POPULAR_LISTING
        const id = params.id
        try{ 
            const responseProjectDetails = await app.$axios.$get(`${httpEndpoint}`, id)
            const responseHomeAgent = await app.$axios.$get(`${httpEndpoint}`, id)
            await store.dispatch('project/getMostViewedListing')
            
            if(responseProjectDetails){
                await store.commit("project/setProjectDetails", responseProjectDetails.data)
            }else{
                await store.commit("project/setProjectDetails", projectDetails)
            }
            if(responseHomeAgent){
                await store.commit("project/setHomeAgent", responseHomeAgent.data)
            }else{
                await store.commit("project/setHomeAgent", homeAgent)
            }
        }catch(e){
            console.log({Error: e.message})
            await store.commit("project/setProjectDetails", projectDetails)
            await store.commit("project/setHomeAgent", homeAgent)
            await store.commit("project/setPopularListings", mostViewedListing)

        }
    }
}
</script>

<style lang="scss" scoped>

</style>