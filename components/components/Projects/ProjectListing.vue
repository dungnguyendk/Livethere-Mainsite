<template lang="html">
    <section class="section--project-listing-filter-sort">
        <div class="container">
            <div class="section__top">
                <div class="section__top-left">
                    <v-btn class="section__btn-filter btn btn--outline
                        btn--green section__btn-style"
                        @click="isOpenFilterProjectDialog= true">
                        <i class="icon-svg svg-candle"></i>
                        <span>More Filters</span>
                    </v-btn>
                </div>
                <div class="section__top-right">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="section__btn-sort btn btn--outline
                                btn--green section__btn-style"
                                v-bind="attrs"
                                v-on="on">
                                <i class="icon-svg svg-sort"></i>
                                <span>Sort by</span>
                                <i class="icon-svg svg-arrow-down"></i>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item-group>
                                <v-list-item
                                    v-for="(item, index) in listSort"
                                    :key="index">
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-menu>
                    <v-btn class="section__btn-map btn btn--outline btn--green
                        section__btn-style" @click="isActiveMap= !isActiveMap">
                        <i class="icon-svg svg-map"></i>
                        <span>Map View</span>
                    </v-btn>
                </div>
            </div>
            <div class="section__body">
                <div class="section__body-map" :class="isActiveMap ?
                    'section__body-map--active' :
                    'section__body-map--disabled'">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.107901410066!2d106.71887761533426!3d10.803047261654479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529f8273eaed5%3A0x27fe58a754c470b0!2zQ8O0bmcgdHkgQ-G7lSBwaOG6p24gxJDhuqd1IFTGsCBYw6J5IEThu7FuZyBCY29ucw!5e0!3m2!1sen!2s!4v1676437005731!5m2!1sen!2s"
                        width="600" height="450" style="border:0;"
                        allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div class="section__body-list">
                    <ProjectCard v-for="(project, index) in listProjects"
                        :key="index" :project="project" @open="openShareSocialDialog($event)"/>
                    </div>
                    <Dialog
                        :open="isOpenFilterProjectDialog"
                        :title="''" 
                        @close="closeFilterProjectDialog"
                        :actions="false"
                    >
                        <FilterProjectForm @close="isOpenFilterProjectDialog=
                            false"/>
                    </Dialog>
                    <Dialog
                        :open="isOpenShareSocialDialog"
                        :title="'Share this listing'"
                        :actions="false"
                        @close="closeShareSocialDialog"
                    >
                        <ShareSocialForm/>     
                    </Dialog>
            </div>
        </div>
    </section>
</template>

<script>
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import ProjectCard from "./components/Card/ProjectCard.vue"
import FilterProjectForm from "~/components/components/Projects/components/Form/FilterProjectForm"
import ShareSocialForm from "./components/Form/ShareSocialForm.vue"
export default {
    name: "ProjectListing",
    components: { ProjectCard, Dialog, FilterProjectForm, ShareSocialForm },
    data() {
        return {
            listProjects: [
                {
                    id: 1,
                    title: "Eden Residences Capitol",
                    imgURL: require(`../../../static/img/project-01.png`),
                    location: "2 Sinaran Drive, Singapore 307467",
                    price: 30000,
                    totalBed: 3,
                    totalBath: 2
                },
                {
                    id: 2,
                    title: "Skypark @ Somerset",
                    imgURL: require(`../../../static/img/project-02.png`),
                    location: "22 Saint Thomas Walk, Singapore 238107",
                    price: 18000,
                    totalBed: 4,
                    totalBath: 4
                },
                {
                    id: 3,
                    title: "Up @ Robertson Quay",
                    imgURL: require(`../../../static/img/project-03.png`),
                    location: "92 Robertson Quay, Singapore 238260",
                    price: 56000,
                    totalBed: 8,
                    totalBath: 10
                },
                {
                    id: 4,
                    title: "The Sail @ Marina Bay",
                    imgURL: require(`../../../static/img/project-01.png`),
                    location: "Marina Boulevard, Singapore 018987",
                    price: 15800,
                    totalBed: 5,
                    totalBath: 9
                }
            ],
            listSort: [
                {
                    id: 1,
                    title: "Newest",
                    value: 1
                },
                {
                    id: 2,
                    title: "Relevant",
                    value: 2
                },
                {
                    id: 3,
                    title: "Lowest Price",
                    value: 3
                },
                {
                    id: 4,
                    title: "Highest Price",
                    value: 4
                }
            ],
            isActiveMap: false,
            isOpenFilterProjectDialog: false, 
            isOpenShareSocialDialog: false, 
        }
    },
    methods: {
        closeFilterProjectDialog() {
            this.isOpenFilterProjectDialog = false
        }, 
        closeShareSocialDialog(){
            this.isOpenShareSocialDialog = false
        },
        openShareSocialDialog(e){
            this.isOpenShareSocialDialog = e.open
        }
    }
}
</script>
        <style lang="scss" scoped>
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
        .section__body-list {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            grid-gap: 4.8rem;
            padding: 2rem;
        }
    }
}
.section__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 0 2.4rem;

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
}
.section__body-map--active {
    margin-bottom: 2.4rem;
    height: 45.6rem;
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
</style>