<template>
    <main>
        <HomeBannerSection />
        <HomeSearch @location="onOpenLocationForm($event)" />
        <HomeIntroSection />
        <HomePopularListingSection />
        <HomeLatestProjectsSection />
        <HomeCTASection />
        <Dialog
            :open="isOpenForm"
            @close="isOpenForm = false"
            size="medium"
            :title="typeForm === 'MRT' ? 'Search By MRT' : 'Search By District'"
            :actions="false"
        >
            <template v-if="typeForm === 'MRT'">
                <LocationMRTForm @close="isOpenForm = false" />
            </template>
            <template v-else>
                <LocationDistrictForm @close="isOpenForm = false" />
            </template>
        </Dialog>
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
import { appSettings } from "~/app-settings"
import { POPULAR_LISTING, LATEST_PROJECT } from "~/ultilities/contants/dummy-data"
export default {
    name: "LiveThereMainSiteHome",
    components: {
        HomeBannerSection,
        HomeSearch,
        HomeIntroSection,
        HomePopularListingSection,
        HomeLatestProjectsSection,
        HomeCTASection,
        Dialog,
        LocationMRTForm,
        LocationDistrictForm
    },
    data() {
        return {
            isOpenForm: false,
            typeForm: "", 
        }
    },
    methods: {
        onOpenLocationForm(e) {
            this.isOpenForm = true
            this.typeForm = e
        },
        onClose() {
            this.isOpenForm = false
            
        }
    }, 
    async asyncData({app, store}){
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
        const popularListings = POPULAR_LISTING
        const latestProjects = LATEST_PROJECT
        try{
            const responsePopularListing = await app.$axios.$get(`${httpEndpoint}`)
            const responseLatestProject = await app.$axios.$get(`${httpEndpoint}`)
            if(responsePopularListing){
                await store.commit("project/setPopularListings", responsePopularListing.data)
            }else {
                await store.commit("project/setPopularListings", popularListings)
            }

            if(responseLatestProject){
                await store.commit("project/setLatestProjects", responseLatestProject.data)
            }else{
                await store.commit("project/setLatestProjects", latestProjects)
            }
            
        }catch(e){
            //Dummy API URL So can't get data. Assign dummy data to swiper to show client 
            //When API URL Updated --> You should delete 'await store.commit("project/setPopularListings", popularListing)' + 'await store.commit("project/setLatestProjects", latestProjects)' in here. Thks
            await store.commit("project/setPopularListings", popularListings)
            await store.commit("project/setLatestProjects", latestProjects)
            console.log({Error: e.message})
        }
    }
}
</script>

<style lang="scss" scoped>
</style>