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
                <template v-if="project.thumbnail">
                    <img :src="project.thumbnail" alt="" />
                </template>
                <template v-else>
                    <img src="https://fakeimg.pl/574x320/?text=No%20Image" alt="" />
                </template>
            </nuxt-link>
        </div>
        <div class="card__content">
            <div class="card__content-fee">
                <h3 class="card__content-price">S$ {{ priceFormat }}/month</h3>
                <div class="card__content-emotions">
                    <v-btn icon @click="openShareSocialDialog(project.id)">
                        <i class="icon-svg svg-export"></i>
                    </v-btn>
                    <v-btn icon @click="activeHeartEmotion()">
                        <i
                            class="ri-heart-3-line"
                            :class="{ 'active-heart': this.activeHeart }"
                        ></i>
                    </v-btn>
                </div>
            </div>
            <div class="card__content-infor">
                <div class="card__content-location card__content-style">
                    <i class="icon-svg svg-location align-self-start"></i>
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
        <LoginDialog :open="isOpenDialogLogin" @close="isOpenDialogLogin = false" />
    </div>
</template>

<script>
import LoginDialog from "~/components/elements/Dialog/LoginDialog.vue"
import LogoProject from "~/static/img/logos/logo-project.svg"
import { convertNumberToCommas } from "~/ultilities/helpers"
import { mapState } from "vuex"
export default {
    name: "ProjectCard",
    components: { LogoProject, LoginDialog },
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
    computed: {
        ...mapState({}),
        priceFormat() {
            return convertNumberToCommas(this.project.rentPrice)
        },
        loggedIn() {
            return this.$auth.loggedIn
        }
    },
    data() {
        return {
            isOpenShareSocialDialog: false,
            isActiveItemEmotion: 1,
            activeHeart: false,
            isOpenDialogLogin: false
        }
    },
    methods: {
        openShareSocialDialog(id) {
            // console.log("id",id);
            this.$emit("open", { id: id, open: (this.isOpenShareSocialDialog = true) })
        },
        activeHeartEmotion() {
            if(this.loggedIn){
                this.activeHeart = !this.activeHeart 
            }else this.isOpenDialogLogin = true
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
    position: relative;
    position: relative;
    height: 0;
    width: 100%;
    padding-bottom: 55.7%;
    a {
        position: static;
    }
    // &::before {
    //     content: "";
    //     display: inline-block;

    // }
    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        // object-fit: contain;
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
        color: var(--color-dark-yellow);
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
        flex: 0 0 3.2rem;
        width: 3.2rem;
        height: 3.2rem;
        background-color: var(--color-dark-yellow);
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
