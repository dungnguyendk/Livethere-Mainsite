<template lang="html">
    <div class="page--project-detail">
        <div class="page--project-detail-first">
            <div class="container">
                <div class="page__top">
                    <div class="page__top-left">
                        <LightBoxListing :images="projectDetails.listImages"/>
                    </div>
                    <div class="page__top-right">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.107901410066!2d106.71887761533426!3d10.803047261654479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529f8273eaed5%3A0x27fe58a754c470b0!2zQ8O0bmcgdHkgQ-G7lSBwaOG6p24gxJDhuqd1IFTGsCBYw6J5IEThu7FuZyBCY29ucw!5e0!3m2!1sen!2s!4v1676437005731!5m2!1sen!2s"
                            style="border: 0"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        >
                        </iframe>
                    </div>
                </div>
                <div class="page__content">
                    <div class="page__content-left">
                        <div class="page__content-left-info">
                            <div class="page__content-left-back">
                                <v-btn to="" class="btn btn--outline btn--green btn-custom" @click="$router.go(-1)">
                                    <v-icon size="16">mdi-arrow-left</v-icon>
                                    <span>Back to Result</span>
                                </v-btn>
                            </div>
                            <div class="page__content-left-header">
                                <div class="page__content-left-iconic">
                                    <div class="page__content-left-logo">
                                        <img
                                            :src="require(`~/static/img/logos/logo-project.svg`)"
                                            alt=""
                                        />
                                        <span>{{ projectDetails.projectInfo.premium ? 'premium' : '' }}</span>
                                    </div>
                                    <h3 class="page__content-left-title"
                                        >{{ projectDetails.projectInfo.title }}</h3
                                    >
                                </div>
                                <div class="page__content-left-emotions">
                                    <v-btn icon @click="isOpenShareSocialDialog = true">
                                        <i class="icon-svg svg-export"></i>
                                    </v-btn>

                                    <v-btn icon @click="activeHeart = !activeHeart">
                                        <i
                                            class="ri-heart-3-line"
                                            :class="{ 'active-heart': activeHeart }"
                                        ></i>
                                    </v-btn>
                                </div>
                            </div>
                            <div class="page__content-left-content">
                                <div class="page__content-left-price">
                                    <h3>S$ {{ priceFormat }}/month</h3>
                                </div>
                                <div class="page__content-left-info">
                                    <div
                                        class="page__content-left-location page__content-left-icon-custom"
                                    >
                                        <i class="icon-svg svg-location"></i>
                                        <span>{{ projectDetails.projectInfo.address }}</span>
                                    </div>
                                    <div class="page__content-left-bed-bath">
                                        <div
                                            class="page__content-left-bed page__content-left-icon-custom"
                                        >
                                            <i class="icon-svg svg-bedroom"></i>
                                            <span>{{ projectDetails.projectInfo.totalBed }}</span>
                                        </div>
                                        <div
                                            class="page__content-left-bath page__content-left-icon-custom"
                                        >
                                            <i class="icon-svg svg-bathroom"></i>
                                            <span>{{ projectDetails.projectInfo.totalBath }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="page-content-left-expansion">
                            <PanelListing :details="projectDetails"/>
                        </div>
                    </div>
                    <div class="page__content-right">
                        <div class="page__content-right-sticky">
                            <ContactAgentCard 
                             :info="homeAgentInfo"
                            @openConfirm="openConfirmDetailDialog($event)" 
                            @openContact="openContactDetailDialog($event)"
                            />
                            <EnquiryForm @snackbar="showStatusForm($event)"/>
                            <NotiCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page--project-detail-second">
            <div class="container">
                <ProjectSwiper>{{ titleSwiper }}</ProjectSwiper>
            </div>
            <ShareSocialDialog
             :open="isOpenShareSocialDialog"
             @close="closeShareSocialDialog"
             :item="targetLinkURL"
            />
            <ConfirmDetailDialog 
             :open="isOpenConfirmDetailDialog"
             @close="closeConfirmDetailDialog"
            />
            <ContactDetailDialog
             :open="isOpenContactDetailDialog"
             @close="closeContactDetailDialog"
            />
            <SuccessSnackBar :open="isShowSnackbar" :message="messageSnackbar" class="snackbar"/>
        </div>
    </div>
</template>
<script>
import EnquiryForm from "~/components/components/Projects/components/Form/EnquiryForm.vue"
import ContactAgentCard from "./components/Card/ContactAgentCard.vue"
import NotiCard from "~/components/components/Projects/components/Card/NotiCard.vue"
import ProjectSwiper from "~/components/components/Projects/components/Slider/ProjectSwiper.vue"
import PanelListing from "~/components/components/Projects/components/Panel/PanelListing.vue"
import LightBoxListing from "~/components/components/Projects/components/Box/LightBoxListing.vue"
import ConfirmDetailDialog from "~/components/components/Projects/components/Dialog/ConfirmDetailDialog.vue"
import ContactDetailDialog from "~/components/components/Projects/components/Dialog/ContactDetailDialog.vue"
import ShareSocialDialog from "~/components/components/Projects/components/Dialog/ShareSocialDialog.vue"
import SuccessSnackBar from "~/components/shared/Snackbar/SuccessSnackBar.vue"
import { convertNumberToCommas } from "~/ultilities/helpers"
import { mapState } from "vuex"
import { state } from '~/store/analytics'
export default {
    name: "ProjectListing",
    components: {
        EnquiryForm,
        ContactAgentCard,
        NotiCard,
        ProjectSwiper,
        PanelListing,
        LightBoxListing,
        ConfirmDetailDialog,
        ContactDetailDialog,
        ShareSocialDialog, 
        SuccessSnackBar
    },
    computed: {
        ...mapState({
            projectDetails: (state) => state.project.projectDetails, 
            homeAgentInfo: (state) => state.project.homeAgent
        }), 
        priceFormat(){
            return convertNumberToCommas(this.projectDetails.projectInfo.price)
        }
    },
    data() {
        return {
            imageURL: "/img/banner/topbannertwo.jpg",
            activeHeart: false,
            isOpenShareSocialDialog: false,
            isOpenConfirmDetailDialog: false,
            isOpenContactDetailDialog: false,
            isShowSnackbar: false, 
            messageSnackbar: '', 
            titleSwiper: "most viewed listings",
            targetLinkURL: {
                id: 1,
                title: "Eden Residences Capitol",
                imgURL: require(`../../../static/img/static/project-01.png`),
                location: "2 Sinaran Drive, Singapore 307467",
                price: 30000,
                totalBed: 3,
                totalBath: 2,
                activeHeart: false,
                linkDetails: "http://localhost:3002/projects/details/1"
            }
        }
    },
    methods: {
        closeShareSocialDialog() {
            this.isOpenShareSocialDialog = false
        },
        openConfirmDetailDialog(e) {
            this.isOpenConfirmDetailDialog = true
        },
        openContactDetailDialog(e) {
            this.isOpenContactDetailDialog = true
        },
        closeConfirmDetailDialog() {
            this.isOpenConfirmDetailDialog = false
        },
        closeContactDetailDialog() {
            this.isOpenContactDetailDialog = false
        }, 
        showStatusForm(e){
            this.isShowSnackbar = e.isShowSnackbar
            this.messageSnackbar = e.messageSnackbar
            
        }
    }
}
</script>
<style lang="scss" scoped>
.page--project-detail {
    @media screen and (max-width: 767px) {
        .page__top {
            display: inline-block;
            .page__top-right {
                margin-top: 2.7rem;
            }
        }
        .page__content {
            display: inline-block;
            .page-content-left-expansion {
                margin-bottom: 2.7rem;
            }
        }

        .page--project-detail-first {
            padding-bottom: 0;
        }
        .page--project-detail-second {
            padding-bottom: 2.7rem;
        }
        .page__content-left-header {
            display: inline-block;
            width: 100%;
            .page__content-left-iconic {
                justify-content: center;
                margin-bottom: 1rem;
            }
            .page__content-left-emotions {
                justify-content: flex-end;
            }
        }
    }
}
.page__top {
    margin-bottom: 2.7rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 2.4rem;

    .page__top-left {
    }
    .page__top-right {
        iframe {
            height: 100%;
            border-radius: 2rem;
            width: 100%;
        }
    }
}
.page__content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 2.4rem;

    .page__content-right {
    }
}
.page__listing {
    padding: 4.6rem 0 7.2rem;
    .page__listing-top {
        margin-bottom: -2.5rem;
        text-align: center;
        h3 {
            font-weight: 800;
            font-size: 2rem;
            line-height: 2.8rem;
            color: var(--color-primary);
            margin-bottom: 0;
            text-align: center;
            text-transform: capitalize;
        }
    }
}
.icon-custom {
    color: var(--color-primary) !important;
}
.page__content-left-back {
    margin-bottom: 2.1rem;
    display: inline-block;
    .btn-custom {
        display: flex;
        align-items: center;
        i {
            color: var(--color-primary);
        }
        span {
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 2rem;
            margin-left: 0.4rem;
        }
        &:hover {
            i {
                color: var(--color-white);
            }
        }
    }
}
.page__content-left-header {
    display: flex;
    margin-bottom: 2.7rem;
    justify-content: space-between;
    .page__content-left-iconic {
        display: flex;
        align-items: center;
    }
    .page__content-left-logo {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-right: 1.3rem;
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
    }
    .page__content-left-title {
        color: var(--color-title-black);
        font-weight: 800;
        font-size: 2.4rem;
        line-height: 2.4rem;
        margin-bottom: 0;
        &:hover {
            color: var(--color-primary);
        }
    }
    .page__content-left-emotions {
        display: flex;
        align-items: flex-start;
        button {
            display: flex;
            align-items: center;
            justify-content: center;
            i {
                width: 2.4rem;
                font-size: 2.4rem;
                color: var(--color-label);
            }
            &:first-child {
                margin-right: 0.5rem;
                i {
                    background-color: var(--color-label);
                }
            }
        }
    }
}
.page__content-left-content {
    .page__content-left-price {
        margin-bottom: 1.7rem;

        h3 {
            font-weight: 800;
            font-size: 2rem;
            line-height: 2.6rem;
            color: #edb842;
            margin-bottom: 0;
        }
    }
    .page__content-left-info {
        margin-bottom: 1.8rem;
        .page__content-left-location {
            margin-bottom: 1rem;
        }
        .page__content-left-bed-bath {
            display: flex;
            align-items: center;
        }
        .page__content-left-bed {
            margin-right: 5.5rem;
            span {
                margin-left: 0.5rem;
            }
        }
    }
}
.page__content-left-icon-custom {
    display: flex;
    align-items: center;
    i {
        width: 2.4rem;
        height: 2.4rem;
        background-color: #edb842;
    }
    span {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--color-title-black);
        padding-left: 0.4rem;
    }
}

.page__content-right-sticky {
    position: sticky;
    top: 0rem;
    z-index: 20;
}
.active-heart {
    &::before {
        content: "\EE0A";
        color: var(--color-primary);
    }
}
.page--project-detail-first {
    padding-bottom: 5.8rem;
    padding-top: 2.4rem;
    background-color: var(--bg-color-white);
}
.page--project-detail-second {
    background-color: var(--color-white);
    padding: 3rem 0 7rem;
}
</style>