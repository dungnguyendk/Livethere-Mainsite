<template lang="html">
    <section class="section--project-listing-filter-sort">
        <div class="container">
            <div class="section__top">
                <div class="section__top-left">
                    <v-btn
                        class="section__btn-filter btn btn--outline btn--green section__btn-style"
                        @click="isOpenFilterProjectDialog = true"
                    >
                        <i class="icon-svg svg-candle"></i>
                        <span>More Filters</span>
                    </v-btn>
                </div>
                <div class="section__top-right">
                    <v-select
                        v-model="selectionSort"
                        :items="listSort"
                        item-text="title"
                        item-value="value"
                        class="select-custom"
                        outlined
                        dense
                        prepend-inner-icon="icon-svg svg-sort"
                        append-icon="mdi-chevron-down"
                        @change="onSortListing()"
                    >
                    </v-select>
                    <v-btn
                        class="section__btn-map btn btn--outline btn--green section__btn-style"
                        @click="isActiveMap = !isActiveMap"
                    >
                        <i class="icon-svg svg-map"></i>
                        <span>Map View</span>
                    </v-btn>
                </div>
            </div>
            <div class="section__body">
                <div
                    v-if="searchListings && searchListings.data.length > 0"
                    class="section__body-map"
                    :class="
                        isActiveMap ? 'section__body-map--active' : 'section__body-map--disabled'
                    "
                >
                    <client-only>
                        <MapMultiMarker :listlat-log="location" :objectLocation="objectLocation" />
                        <!-- <Map :listlat-log="location" :center="location" /> -->
                    </client-only>
                </div>
                <template v-if="searchListings && searchListings.data.length > 0">
                    <div class="section__body-list">
                        <ProjectCard
                            v-for="(project, index) in searchListings.data"
                            :key="index"
                            :project="project"
                            @open="openShareSocialDialog($event)"
                        />
                    </div>
                    <div class="section__body-load-more">
                        <template v-if="searchListings.pageCount > 1">
                            <button @click="$emit('loadMore')">Load more</button>
                        </template>
                    </div>
                    <template v-if="isLoading">
                        <div class="section__body-list pb-5">
                            <div class="card--project">
                                <v-skeleton-loader
                                    type="list-item-avatar , image, list-item-three-line"
                                ></v-skeleton-loader>
                            </div>
                            <div class="card--project">
                                <v-skeleton-loader
                                    class="card--project"
                                    type="list-item-avatar , image, list-item-three-line"
                                ></v-skeleton-loader>
                            </div>
                        </div>
                    </template>
                </template>
                <template v-else>
                    <div class="no-result">
                        <h3>No Results</h3>
                        <p
                            >We couldn't find any listings that match your search. <br />Try
                            updating your filters or searching a different location.
                        </p>
                    </div>
                </template>

                <FilterDialog :open="isOpenFilterProjectDialog" @close="closeFilterProjectDialog" />
                <ShareSocialDialog
                    :open="isOpenShareSocialDialog"
                    @close="closeShareSocialDialog"
                    :item="targetLinkURL"
                />
            </div>
        </div>
    </section>
</template>

<script>
import ProjectCard from "~/components/components/Projects/components/Card/ProjectCard.vue"
import FilterProjectForm from "~/components/components/Projects/components/Form/FilterProjectForm.vue"
import ShareSocialForm from "~/components/components/Projects/components/Form/ShareSocialForm.vue"
import FilterDialog from "~/components/components/Projects/components/Dialog/FilterDialog.vue"
import ShareSocialDialog from "~/components/components/Projects/components/Dialog/ShareSocialDialog.vue"
import { mapState } from "vuex"
import { state } from "~/store/analytics"
import qs from "qs"
export default {
    name: "ProjectListing",
    components: {
        ProjectCard,
        FilterProjectForm,
        ShareSocialForm,
        FilterDialog,
        ShareSocialDialog,
        MapMultiMarker: () => {
            if (typeof window !== "undefined")
                return import("~/components/elements/Map/MapMultiMarker.vue")
        }
    },
    props: {
        isLoading : {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        ...mapState({
            searchListings: (state) => state.project.searchListings,
            paramsSearch: (state) => state.project.paramsSearch
        }),
        selectionSort: {
            get() {
                return this.paramsSearch?.sortBy || "Relevant"
            },
            set(val) {
                this.$store.commit("project/setParamsSearch", { ...this.paramsSearch, sortBy: val })
            }
        },
        location() {
            return this.searchListings.data.map((item) => ({
                latLng: [parseFloat(item.location.lat), parseFloat(item.location.lon)]
            }))
        },
        objectLocation(){
            return this.searchListings.data
        }
    },
    data() {
        return {
            listSort: [
                {
                    id: 1,
                    title: "Newest",
                    value: "Newest"
                },
                {
                    id: 2,
                    title: "Relevant",
                    value: "Relevant"
                },
                {
                    id: 3,
                    title: "Lowest Price",
                    value: "Lowest"
                },
                {
                    id: 4,
                    title: "Highest Price",
                    value: "Highest"
                }
            ],
            isActiveMap: false,
            isOpenFilterProjectDialog: false,
            isOpenShareSocialDialog: false,
            targetLinkURL: {},
        }
    },
    created() {
        // console.log("location", this.location)
    },
    methods: {
        closeFilterProjectDialog() {
            this.isOpenFilterProjectDialog = false
        },
        closeShareSocialDialog() {
            this.isOpenShareSocialDialog = false
        },
        openShareSocialDialog(e) {
            this.isOpenShareSocialDialog = e.open
            this.targetLinkURL = this.searchListings.data.find((index) => {
                return index.id === e.id
            })
        },
        showStatusForm(e) {},
        async onSortListing() {
            const queryStringify = qs.stringify(this.paramsSearch, { encode: false })
            try {
                //
                await this.$store.dispatch("project/searchListing", queryStringify)
            } catch (e) {
                console.log({ Error: e.message })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.card--project {
    background-color: var(--color-white);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 2rem;
    overflow: hidden;
}
.no-result {
    min-height: 65vh;
    text-align: center;
    padding-top: 5vh;
}
.section--project-listing-filter-sort {
    background-color: var(--bg-color-white);
    @media screen and (max-width: 768px) {
        .section__body-list {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            grid-gap: 4.8rem;
            padding: 4.8rem;
        }
    }
    @media screen and (max-width: 450px) {
        .section__btn-style {
            i {
            }
            span {
                display: none;
            }
        }
        .section__body-load-more {
            padding: 2rem 0 2.8rem;
        }
        .section__body-list {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            grid-gap: 3rem;
            padding: 1rem;
        }
    }
}

.section__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 0 2.4rem;
    .section__top-right {
        display: flex;
        align-items: center;
    }
    .section__btn-sort {
        span {
            margin-right: 0.4rem;
        }
        .svg-arrow-down {
            width: 1.2rem;
        }
    }
}
.section__body-map {
    transition: 300ms linear;
    overflow: hidden;
    position: relative;
    z-index: 1;
    .section__body-map-custom {
        height: 25.6rem;
    }
}
.section__body-map--active {
    margin-bottom: 2.4rem;
    height: 25.6rem;
}
.section__body-map--disabled {
    height: 0;
    margin-bottom: 0;
}
.section__body-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 4.8rem 2.4rem;
}
.section__btn-style {
    span {
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2rem;
        padding-left: 0.4rem;
    }
    i {
        width: 1.6rem;
    }
    &:hover,
    &:focus {
        i {
            background-color: var(--color-white);
        }
    }
}
.section__body-load-more {
    padding: 5.8rem 0 3.8rem;
    button {
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2rem;
        color: var(--color-primary);
        text-decoration: underline;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        display: inline-block;
    }
}
.select-custom {
    margin-right: 1.2rem;
    border: none !important;

    ::v-deep(.v-text-field__details) {
        display: none;
        margin-bottom: 0;
    }
    ::v-deep(.v-input__slot) {
        margin-bottom: 0;

        .v-input__prepend-inner {
            i {
                width: 1.6rem;
                background-color: var(--color-primary);
            }
        }
        .v-select__selections {
            input {
                display: none;
            }
        }
        .v-select__selection {
            max-width: 100%;
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 2rem;
            color: var(--color-primary);
        }
        fieldset {
            border: 0.2rem solid var(--color-primary);
            border-radius: 0.8rem;
        }
    }
    // ::v-deep(.v-input__control){
    //     border: 0.1rem solid var(--color-primary);
    //     border-radius: 0.8rem;

    // }
}
</style>
