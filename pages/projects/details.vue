<template>
    <v-app>
        <v-main>
            <LandlordHeader />
            <ProjectDetail/>
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
</style>