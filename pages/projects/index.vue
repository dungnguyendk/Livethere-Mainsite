<template>
    <main class="page--projects">
        <HomeSearch @location="onOpenLocationForm($event)" />
        <ProjectListing @loadMore="handleLoadMore" :isLoading="isLoading" />
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
import ProjectListing from "~/components/components/Projects/ProjectListing.vue"
import HomeSearch from "~/components/components/Section/Home/HomeSearch.vue"
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import LocationDistrictForm from "~/components/components/Section/components/Form/LocationDistrictForm.vue"
import LocationMRTForm from "~/components/components/Section/components/Form/LocationMRTForm.vue"
import { mapState } from "vuex"
import { generateLandlordsSEOMetaTags } from "~/ultilities/seo-configs"
import { httpEndpoint } from "~/services/https/endpoints"
import qs from "qs"
export default {
    components: { ProjectListing, HomeSearch, Dialog, LocationDistrictForm, LocationMRTForm },
    head: {
        title: "Livethere"
    },
    computed: {
        ...mapState({
            searchListings: (state) => state.project.searchListings,
            paramsSearch: (state) => state.project.paramsSearch,
            isProject: (state) => state.project.isProject
        })
    },
    data() {
        return {
            isOpenForm: false,
            typeForm: "",
            isLoading: false,
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
            this.isLoading = true            // console.log("handleLoadMore")
            // console.log({...this.paramsSearch,perPage: + 10})
            const newPerPage = {
                ...this.paramsSearch,
                ...{ perPage: Number(this.paramsSearch.perPage) + 4 }
            }
            // console.log("newPerPage", newPerPage)
            const queryStringify = qs.stringify(newPerPage, { encode: false })
            this.$router.push(`/projects?${queryStringify}`)
            // {...queryStringify,...{perPage: Number(this.$store.state.project.paramsSearch.perPage) + 10} }

            try {
                await this.$store.dispatch("project/searchListing", queryStringify).then((res) => {
                    console.log(res);
                    this.isLoading = !res
                })
                await this.$store.commit("project/setParamsSearch", newPerPage)
            } catch (e) {
                console.log({ Error: e.message })
            }
        }
    },

    async asyncData({ app, query, store }) {
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
        const queryStringify = qs.stringify(query, { encode: false })
        // console.log("asyncData queryStringify :", queryStringify)
        // console.log("asyncData  query:", query)
        try {
            const responseMrtLine = await app.$apiCmsPublic.$get(
                `${httpEndpoint.projects.linesMrt}`
            )
            // console.log("responseMrtLine",responseMrtLine);
            if (responseMrtLine) {
                
                store.commit("project/setLinesMrt", responseMrtLine)
            } else {
                store.commit("project/setLinesMrt", [])
            }
            await store.commit("project/setParamsSearch", query)
            await store.dispatch("project/searchListing", queryStringify)
            
        } catch (e) {
            console.log({ Error: e.message })
        }
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
