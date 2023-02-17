<template>
    <v-app>
        <v-main>
            <LandlordHeader />
            <ProjectDetail />
            <LandingFooter />
        </v-main>
    </v-app>
</template>

<script>
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import LandingFooter from "~/components/shared/Footer/LandingFooter.vue"
import ProjectDetail from "~/components/components/Projects/ProjectDetail.vue"
export default {
    components: { LandlordHeader, LandingFooter, ProjectDetail },
    head: {
        title: "Project Detail"
    }
}
</script>

<style lang="scss" scoped>

</style>