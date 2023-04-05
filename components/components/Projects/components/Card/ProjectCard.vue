<template>
    <div class="card--project">
        <div class="card__header">
            <div class="card__header-logo" v-if="project.livethereChecked">
                <img src="~/static/img/logos/logo-project.svg" alt="" />
                <!-- <img :src="require(`~/static/img/logos/logo-project.svg`)" alt=""> -->
                <span>premium</span>
            </div>
            <nuxt-link :to="`/projects/${project.slug}`" class="card__header-title">{{
                project.buildingName
            }}</nuxt-link>
        </div>
        <div class="card__image">
            <nuxt-link :to="`/projects/${project.slug}`">
                <template v-if="project.images">
                    <img :src="project.images" alt="" />
                </template>
                <template v-else>
                    <img src="https://fakeimg.pl/574x320/?text=No%20Image" alt="" />
                </template>
            </nuxt-link>
        </div>
        <div class="card__content">
            <div class="card__content-fee">
                <h3 class="card__content-price">S$ {{ project.rentPrice }}/month</h3>
                <div class="card__content-emotions">
                    <v-btn icon @click="openShareSocialDialog(project.id)">
                        <i class="icon-svg svg-export"></i>
                    </v-btn>
                    <v-btn icon @click="activeHeartEmotion(project.id)">
                        <i
                            class="ri-heart-3-line"
                            :class="{ 'active-heart': project.favourite }"
                        ></i>
                    </v-btn>
                </div>
            </div>
            <div class="card__content-infor">
                <div class="card__content-location card__content-style">
                    <i class="icon-svg svg-location"></i>
                    <span>{{ project.buildingAddress }}</span>
                </div>
                <div class="card__content-bed-bath">
                    <div class="card__content-bed card__content-style">
                        <i class="icon-svg svg-bedroom"></i>
                        <span>{{ project.bedrooms }}</span>
                    </div>
                    <div class="card__content-bath card__content-style">
                        <i class="icon-svg svg-bathroom"></i>
                        <span>{{ project.bathrooms }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LogoProject from "~/static/img/logos/logo-project.svg"
export default {
    name: "ProjectCard",
    components: {LogoProject},
    props: {
        project: {
            type: Object,
            default: () => {}
        },
        listProject: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            isOpenShareSocialDialog: false,
            isActiveItemEmotion: 1
        }
    },
    methods: {
        openShareSocialDialog(id) {
            // console.log("id",id);
            this.$emit("open", { id: id, open: (this.isOpenShareSocialDialog = true) })
        },
        activeHeartEmotion(id) {
            try {
                var project = this.listProject.find((e) => e.id === id)
                project.activeHeart = !project.activeHeart
            } catch (error) {
                console.log(error)
            }
        }
    },
    watch: {}
}
</script>

<style lang="scss" scoped>
.card--project {
    background-color: var(--color-white);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 2rem;
}
.card__header {
    display: flex;
    align-items: center;

    padding: 1rem 2.9rem 0.8rem;
    min-height: 7.8rem;
    .card__header-logo {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    img {
        width: fit-content;
        margin: 0 auto 0.2rem;
    }
    span {
        font-weight: 800;
        font-size: 1rem;
        line-height: 1.4rem;
        color: var(--color-primary);
        text-transform: uppercase;
    }
    .card__header-title {
        color: var(--color-title-black);
        font-weight: 800;
        font-size: 2rem;
        text-align: center;
        line-height: 2.8rem;
        margin-bottom: 0;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
        margin: 0 auto;
        -webkit-box-orient: vertical;
        &:hover {
            color: var(--color-primary);
        }
    }
}
.card__image {
    img {
        width: 100%;
        object-fit: cover;
    }
}
.card__content {
    padding: 2.2rem 1.6rem;
    .card__content-fee {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
    .card__content-price {
        font-weight: 800;
        font-size: 2.2rem;
        line-height: 2.6rem;
        color: #edb842;
        margin-bottom: 0;
    }
    .card__content-emotions {
        display: flex;
        align-items: center;
        button {
            display: flex;
            align-items: center;
            i {
                width: 2.4rem;
                font-size: 2.4rem;
                color: var(--color-label);
            }
            &:first-child {
                margin-right: 1.6rem;
                i {
                    background-color: var(--color-label);
                }
            }
        }
    }
}
.card__content-infor {
    .card__content-location {
        margin-bottom: 1rem;
    }
    .card__content-bed-bath {
        display: flex;
        align-items: center;
    }
    .card__content-bed {
        margin-right: 4.6rem;
    }
}
.card__content-style {
    display: flex;
    align-items: center;

    i {
        width: 3.2rem;
        height: 3.2rem;
        background-color: #edb842;
    }
    span {
        font-weight: 500;
        font-size: 1.8rem;
        line-height: 2.4rem;
        color: var(--color-title-black);
        padding-left: 0.5rem;
    }
}
.active-heart {
    &::before {
        content: "\EE0A";
        color: var(--color-primary);
    }
}
</style>
