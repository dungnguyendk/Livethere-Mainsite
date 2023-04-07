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
            await store.dispatch('project/getMostViewedListing')
            const responseProjectDetails = await app.$apiCmsPublic.$get(`${httpEndpoint.projects.getListings}/${slug}`)
            if(responseProjectDetails){
                await store.commit("project/setProjectDetails", responseProjectDetails)
            }else {
                await store.commit("project/setProjectDetails", {})
            }
        }catch(e){
            console.log({Error: e.message})
        }
    }
}
</script>

<style lang="scss" scoped>

</style>