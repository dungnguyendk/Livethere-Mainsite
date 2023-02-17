<template>
    <v-app>
        <v-main class="page--projects">
            <LandlordHeader />
            <HomeSearch />
            <ProjectListing />
            <LandingFooter />
        </v-main>
    </v-app>
</template>

<script>
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import LandingFooter from "~/components/shared/Footer/LandingFooter.vue"
import ProjectListing from "~/components/components/Projects/ProjectListing.vue"
import HomeSearch from "~/components/components/Section/Home/HomeSearch.vue"
export default {
    components: { LandlordHeader, LandingFooter, ProjectListing, HomeSearch },
    head: {
        title: "Livethere"
    }
}
</script>

<style lang="scss" scoped>
.page--projects{
    background-color: #fafafa;
}
::v-deep(.section--search) {
    position: relative;
    margin: 0 0 1.6rem;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 0px 0px 80px 80px;
    background-color: var(--color-white);
    .section--search__form {
        border-radius: 0;
        box-shadow: none;
      
        
    }
}
</style>