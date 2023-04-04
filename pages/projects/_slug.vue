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
export default {
    name: "LiveThereMainSiteDetails",
    components: { LandlordHeader, LandingFooter, ProjectDetail },
    head: {
        title: "Livethere"
    },
    async asyncData({app, params, store}){

        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
        const slug = params.slug
        // console.log("asyncData",slug);
        try{
            const responseProjectDetails = await app.$apiCmsPublic.$get(`${httpEndpoint.projects.getListings}/${slug}`)
            const responseMostViewListing = await app.$apiCmsPublic.$get(`${httpEndpoint.projects.getMostViewListing}`)
            // await store.commit("project/setHomeAgent", homeAgent)
            // await store.commit("project/setPopularListings", mostViewedListing)
            
            // console.log("responseProjectDetails",responseProjectDetails);
            if(responseProjectDetails){
                await store.commit("project/setProjectDetails", responseProjectDetails)
            }else {
                await store.commit("project/setProjectDetails", {})
            }
            if(responseMostViewListing){
                await store.commit("project/setMostViewedListings", responseMostViewListing)
            }else {
                await store.commit("project/setMostViewedListings", [])
            }
            // const responseHomeAgent = await app.$axios.$get(`${httpEndpoint}`, id)
            // const responseMostViewedListing = await app.$axios.$get(`${httpEndpoint}`)
            // if(responseMostViewedListing){
            //     await store.commit("project/setPopularListings", responseMostViewedListing.data)
            // }else {
            //     await store.commit("project/setPopularListings", popularListings)
            // }
            // if(responseProjectDetails){
            //     await store.commit("project/setProjectDetails", responseProjectDetails.data)
            // }else{
            //     await store.commit("project/setProjectDetails", projectDetails)
            // }
            // if(responseHomeAgent){
            //     await store.commit("project/setHomeAgent", responseHomeAgent.data)
            // }else{
            //     await store.commit("project/setHomeAgent", homeAgent)
            // }
        }catch(e){
            console.log({Error: e.message})
        }
    }
}
</script>

<style lang="scss" scoped>

</style>