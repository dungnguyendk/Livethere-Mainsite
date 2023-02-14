<template lang="html">
    <section class="section--project-listing-filter-sort">
        <div class="container">
            <div class="section__top">
                <!-- <div class="section__top-left">
                    <v-btn class="section__btn-filter btn btn--outline btn--green">
                        <img class="icon" :src="require(`~/static/img/icons/candle.svg`)" alt=""/>
                        <span>More Filters</span>
                    </v-btn>
                </div>
                <div class="section__top-right">
                    <v-btn class="section__btn-sort btn btn--outline btn--green"  prepend-icon="">
                        <img :src="require(`~/static/img/icons/sort.svg`)" alt=""/>
                        <span>Sort by</span>
                        <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="section__btn-map btn btn--outline btn--green">
                        <img :src="require(`~/static/img/icons/map.svg`)" alt=""/>
                        <span>Map View</span>
                    </v-btn>
                </div> -->
                
            </div>
            <div class="section__body">
                <ProjectCard v-for="(project, index) in listProjects" :key="index" :project="project"/>
            </div>
        </div>
    </section>
</template>

<script>
import ProjectCard from "./components/Card/ProjectCard.vue"
export default {
    name: "ProjectListingFilterAndSort",
    components: { ProjectCard },
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
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.section--project-listing-filter-sort {
    background-color: var(--bg-color-white);
    @media screen and (max-width: 768px) {
        .section__body {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            grid-gap: 4.8rem;
            padding: 4.8rem;
        }
    }
    @media screen and (max-width: 450px) {
        .section__body {
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

    .section__btn-filter {
        // transition: 0.25s ease;
        span {
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 2rem;
            padding-left: 0.4rem;
        }
        &:hover,
        &:focus {
            img {
                filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%)
                    hue-rotate(331deg) brightness(101%) contrast(105%);
            }
        }
    }
    .section__btn-sort {
        span {
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 2rem;
            padding-left: 0.4rem;
        }
        .v-icon {
            font-size: 1.6rem;
            font-weight: 700;
            line-height: 2rem;
            padding-left: 0.2rem;
        }
        &:hover,
        &:focus {
            img {
                filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%)
                    hue-rotate(331deg) brightness(101%) contrast(105%);
            }
        }
    }
    .section__btn-map {
        span {
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 2rem;
            padding-left: 0.4rem;
        }
        &:hover,
        &:focus {
            img {
                filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%)
                    hue-rotate(331deg) brightness(101%) contrast(105%);
            }
        }
    }
}
.section__body {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 4.8rem 2.4rem;
}
</style>