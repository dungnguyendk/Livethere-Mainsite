<template>
    <v-app>
        <v-main>
            <LandlordHeader />
            <div class="pageWrapper">
                <ProjectDetail/>
            </div>
            <LandingFooter />
        </v-main>
    </v-app>
</template>

<script>
import LandlordHeader from "~/components/shared/Header/LandlordHeader"
import LandingFooter from "~/components/shared/Footer/LandingFooter"
import ProjectDetail from "~/components/components/Projects/ProjectDetail.vue"
export default {
    name: "LiveThereMainSiteDetails",
    components: { LandlordHeader, LandingFooter, ProjectDetail },
    head: {
        title: "Livethere"
    },
}
</script>

<style lang="scss" scoped>
.pageWrapper {
    margin-top: 8rem;
    min-height: calc(100vh - 20rem);
    @media screen and(max-width: 1280px) {
        margin-top: 6.4rem;
    }
}
</style>