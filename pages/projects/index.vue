<template>
    <main class="page--projects">
        <HomeSearch @location="onOpenLocationForm($event)"/>
        <ProjectListing @loadMore="handleLoadMore"/>
        <Dialog 
         :open="isOpenForm" 
         @close="isOpenForm = false" size="medium" 
         :title="typeForm === 'MRT' ? 'Search By MRT' : 'Search By District'"
         :actions="false"
         >
            <template v-if="typeForm === 'MRT'">
                <LocationMRTForm @close="isOpenForm = false"/>
            </template>
            <template v-else>
                <LocationDistrictForm @close="isOpenForm = false"/>
            </template>
        </Dialog>
    </main>
</template>

<script>
import ProjectListing from "~/components/components/Projects/ProjectListing.vue"
import HomeSearch from "~/components/components/Section/Home/HomeSearch.vue"
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import LocationDistrictForm from "~/components/components/Section/components/Form/LocationDistrictForm.vue"
import LocationMRTForm from "~/components/components/Section/components/Form/LocationMRTForm.vue"
import { mapState } from "vuex"
export default {
    components: { ProjectListing, HomeSearch, Dialog, LocationDistrictForm, LocationMRTForm },
    head: {
        title: "Livethere"
    },
    computed: {
        ...mapState({
            searchListings: (state) => state.project.searchListings,
            paramsSearch: (state) => state.project.paramsSearch,
        })
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
        },
        async handleLoadMore() {
            console.log(this.$route.query)
            console.log({...this.$route.query,perPage: + 10})
            // {...this.$route.query,...{perPage: Number(this.$store.state.project.paramsSearch.perPage) + 10} }
            await this.$store.dispatch('project/searchListing',{...this.$route.query,...{perPage: Number(this.$store.state.project.paramsSearch.perPage) + 10}})
        }
    },

    async asyncData({query, store}) {
        await store.commit("project/setParamsSearch", query)
        await store.dispatch('project/searchListing',query)
    }
    
}
</script>

<style lang="scss" scoped>

.page--projects {
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