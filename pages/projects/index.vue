<template>
    <main class="page--projects">
        <HomeSearch />
        <ProjectListing />
    </main>
</template>

<script>
import ProjectListing from "~/components/components/Projects/ProjectListing.vue"
import HomeSearch from "~/components/components/Section/Home/HomeSearch.vue"
export default {
    components: {ProjectListing, HomeSearch },
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
    overflow: hidden;
    .section--search__form {
        border-radius: 0;
        box-shadow: none;
      
        
    }
}
</style>