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
            typeForm: ""
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
    }
}
</script>

<style lang="scss" scoped>
</style>