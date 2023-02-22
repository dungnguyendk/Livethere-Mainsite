<template lang="html">
    <div class="page--project-detail">
        <div class="container page--project-detail-first">
            <div class="page__top">
                <div class="page__top-left">
                    <div class="page__top-left-list-images">
                        <div
                            class="page__top-left-column"
                            v-for="(image, index) in listImages"
                            :key="index"
                        >
                            <img :src="image.imgURL" alt="" />
                        </div>
                        <!-- <Tinybox
                            v-model="index"
                            :images="listImages"
                        /> -->
                    </div>
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
                            <nuxt-link to="/" class="btn btn--outline btn--green btn-custom">
                                <v-icon size="16">mdi-arrow-left</v-icon>
                                <span>Back to Result</span>
                            </nuxt-link>
                        </div>
                        <div class="page__content-left-header">
                            <div class="page__content-left-iconic">
                                <div class="page__content-left-logo">
                                    <img
                                        :src="require(`~/static/img/logos/logo-project.svg`)"
                                        alt=""
                                    />
                                    <span>premium</span>
                                </div>
                                <h3 class="page__content-left-title">Eden Residences Capitol</h3>
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
                                <h3>S$ 30,000/month</h3>
                            </div>
                            <div class="page__content-left-info">
                                <div
                                    class="page__content-left-location page__content-left-icon-custom"
                                >
                                    <i class="icon-svg svg-location"></i>
                                    <span>1 Shenton Way, Singapore 068803</span>
                                </div>
                                <div class="page__content-left-bed-bath">
                                    <div
                                        class="page__content-left-bed page__content-left-icon-custom"
                                    >
                                        <i class="icon-svg svg-bedroom"></i>
                                        <span>5</span>
                                    </div>
                                    <div
                                        class="page__content-left-bath page__content-left-icon-custom"
                                    >
                                        <i class="icon-svg svg-bathroom"></i>
                                        <span>10</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="page-content-left-expansion">
                        <v-expansion-panels flat v-model="panel" multiple>
                            <v-expansion-panel
                                expand
                                v-model="panel"
                                class="expansion-description expansion-panel-custom"
                            >
                                <v-expansion-panel-header expand-icon="mdi-menu-down">
                                    Description
                                    <template v-slot:actions>
                                        <v-icon color="primary"> $expand </v-icon>
                                    </template>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <p
                                        >The centrepiece of an iconic integrated development
                                        comprising three landmarks – Stamford House, Capitol
                                        Building and Capitol Theatre. Located in the Civic District,
                                        perched above Singapore’s well-known historical street
                                        corner, the curved residential block offers a front row seat
                                        to the city’s Civic and Cultural District as well as
                                        spectacular views of Marina Bay and beyond.</p
                                    >
                                    <p
                                        >Eden Residences Capitol is a luxurious residential edifice
                                        that sits across the road from The City Hall MRT Interchange
                                        and is literally a stone’s throw away to Peninsula Plaza and
                                        Raffles City. Living in the Eden Residences Capitol provides
                                        an easy access to the fitness and recreational parks like
                                        that of Fort Canning Park. Residents can also enjoy the
                                        convenience of the amenities nearby such as banks,
                                        supermarket, retails outlets, restaurants and other
                                        necessities.</p
                                    >
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel class="expansion-property expansion-panel-custom">
                                <v-expansion-panel-header expand-icon="mdi-menu-down">
                                    Property Details
                                    <template v-slot:actions>
                                        <v-icon color="primary"> $expand </v-icon>
                                    </template>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <div class="expansion-property-row">
                                        <p>monthly price:</p>
                                        <p>S$ 30,000 </p>
                                    </div>
                                    <div class="expansion-property-row">
                                        <p>unit size:</p>
                                        <p>5,963 sqft </p>
                                    </div>
                                    <div class="expansion-property-row">
                                        <p>monthly price PSF:</p>
                                        <p>S$ 5.03</p>
                                    </div>
                                    <div class="expansion-property-row">
                                        <p>lease term:</p>
                                        <p>24 months </p>
                                    </div>
                                    <div class="expansion-property-row">
                                        <p>furnishing:</p>
                                        <p>Fully Furnished</p>
                                    </div>
                                    <div class="expansion-property-row">
                                        <p>built year:</p>
                                        <p>2015</p>
                                    </div>
                                    <div class="expansion-property-row">
                                        <p>tenure:</p>
                                        <p>99-year Leasehold</p>
                                    </div>
                                    <div class="expansion-property-row">
                                        <p>property type:</p>
                                        <p>Condo</p>
                                    </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel class="expansion-available expansion-panel-custom">
                                <v-expansion-panel-header expand-icon="mdi-menu-down">
                                    Available from
                                    <template v-slot:actions>
                                        <v-icon color="primary"> $expand </v-icon>
                                    </template>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <div class="available-from-row">
                                        <i class="icon-svg svg-calendar"></i>
                                        <p>2022-02-01</p>
                                    </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel class="expansion-amenities expansion-panel-custom">
                                <v-expansion-panel-header expand-icon="mdi-menu-down">
                                    Amenities
                                    <template v-slot:actions>
                                        <v-icon color="primary"> $expand </v-icon>
                                    </template>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <div class="expansion-amenities-row">
                                        <div
                                            class="expansion-amenities-column"
                                            v-for="(item, index) in listAmenities"
                                            :key="index"
                                        >
                                            <div
                                                class="expansion-amenities-icon"
                                                v-for="(element, index) in item.listIcons"
                                                :key="index"
                                            >
                                                <i :class="element.icon"></i>
                                                <p>{{ element.text }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </div>
                </div>
                <div class="page__content-right">
                    <div class="page__content-right-sticky">
                        <ContactAgentCard />
                        <EnquiryForm />
                    </div>
                    <NotiCard />
                </div>
            </div>
        </div>
        <div class="container page--project-detail-second">
            <div class="page__listing">
                <div class="page__listing-top">
                    <h3>most viewed listings</h3>
                </div>
                <div class="page__listing-content">
                    <swiper class="swiper swiper-item" :options="swiperOption">
                        <swiper-slide
                            class="swiper-box"
                            v-for="element in popularListing"
                            :key="element.id"
                        >
                            <div class="swiper-box__top">
                                <div class="swiper-box__image">
                                    <img :src="element.imgURL" alt="" />
                                </div>
                                <div class="swiper-box__title">
                                    <nuxt-link to="/" class="swiper-box__title-link">
                                        {{ element.title }}
                                    </nuxt-link>
                                </div>
                            </div>
                            <div class="swiper-box__content">
                                <div class="swiper-box__content-first">
                                    <img :src="element.imgURLIconFirst" alt="" />
                                    <p>{{ element.address }}</p>
                                </div>
                                <div class="swiper-box__content-second">
                                    <div>
                                        <img :src="element.imgURLIconSecond" alt="" />
                                        <p>{{ element.totalBed }}</p>
                                    </div>
                                    <div>
                                        <img :src="element.imgURLIconThird" alt="" />
                                        <p>{{ element.totalBath }}</p>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-pagination" slot="pagination"></div>
                        <!-- <div class="swiper-button-next" slot="button-next" :class="{'swiper-button-active' : activeColorArrow}"></div> -->
                        <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                    <div class="swiper-fraction">
                        <span class="fraction-to">{{ this.fractionTo }}</span>
                        <span class="fraction-form">{{ this.fractionForm }}</span>
                    </div>
                </div>
            </div>
            <Dialog
                :open="isOpenShareSocialDialog"
                :title="'Share this listing'"
                :actions="false"
                @close="closeShareSocialDialog"
            >
                <ShareSocialForm />
            </Dialog>
        </div>
    </div>
</template>
<script>
import EnquiryForm from "~/components/components/Projects/components/Form/EnquiryForm"
import ContactAgentCard from "./components/Card/ContactAgentCard.vue"
import NotiCard from "~/components/components/Projects/components/Card/NotiCard"
import ShareSocialForm from "./components/Form/ShareSocialForm.vue"
import Dialog from "~/components/elements/Dialog/Dialog.vue"
export default {
    name: "ProjectListing",
    components: { EnquiryForm, ContactAgentCard, NotiCard, ShareSocialForm, Dialog },
    data() {
        const self = this
        return {
            listGallery: [
                {
                    id: 1,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_1.jpeg`)
                },
                {
                    id: 2,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_2.jpeg`)
                },
                {
                    id: 3,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_3.jpeg`)
                },
                {
                    id: 4,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_4.jpeg`)
                },
                {
                    id: 5,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_5.jpeg`)
                },
                {
                    id: 6,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_6.jpeg`)
                },
                {
                    id: 7,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_7.jpeg`)
                },
                {
                    id: 8,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_8.jpeg`)
                }
            ],
            listAmenities: [
                {
                    id: 1,
                    listIcons: [
                        {
                            id: 1,
                            icon: "icon-svg svg-free-wifi",
                            text: "free wifi"
                        },
                        {
                            id: 2,
                            icon: "icon-svg svg-pool",
                            text: "pool"
                        },
                        {
                            id: 3,
                            icon: "icon-svg svg-bathtub",
                            text: "bathtub"
                        },
                        {
                            id: 4,
                            icon: "icon-svg svg-spa",
                            text: "spa"
                        },
                        {
                            id: 5,
                            icon: "icon-svg svg-sauna",
                            text: "sauna"
                        },
                        {
                            id: 6,
                            icon: "icon-svg svg-bbq",
                            text: "BBQ"
                        },
                        {
                            id: 7,
                            icon: "icon-svg svg-concierge",
                            text: "concierge"
                        }
                    ]
                },
                {
                    id: 2,
                    listIcons: [
                        {
                            id: 8,
                            icon: "icon-svg svg-game-room",
                            text: "games room"
                        },
                        {
                            id: 9,
                            icon: "icon-svg svg-tennis-court",
                            text: "tennis-court"
                        },
                        {
                            id: 10,
                            icon: "icon-svg svg-patio",
                            text: "patio"
                        },
                        {
                            id: 11,
                            icon: "icon-svg svg-taxi",
                            text: "taxi"
                        },
                        {
                            id: 12,
                            icon: "icon-svg svg-pet-allowed",
                            text: "pets allowed"
                        },
                        {
                            id: 13,
                            icon: "icon-svg svg-pool-view",
                            text: "pool view"
                        },
                        {
                            id: 14,
                            icon: "icon-svg svg-jacuzzi",
                            text: "jacuzzi"
                        }
                    ]
                },
                {
                    id: 3,
                    listIcons: [
                        {
                            id: 15,
                            icon: "icon-svg svg-gym",
                            text: "gym"
                        },
                        {
                            id: 16,
                            icon: "icon-svg svg-yoga",
                            text: "yoga"
                        },
                        {
                            id: 17,
                            icon: "icon-svg svg-gourmet-kitchen",
                            text: "gourmet kitchen"
                        },
                        {
                            id: 18,
                            icon: "icon-svg svg-restaurant",
                            text: "restaurant"
                        },
                        {
                            id: 19,
                            icon: "icon-svg svg-playground",
                            text: "playground"
                        },
                        {
                            id: 20,
                            icon: "icon-svg svg-squash-court",
                            text: "squash court"
                        },
                        {
                            id: 21,
                            icon: "icon-svg svg-social-lounge",
                            text: "social lounge"
                        }
                    ]
                }
            ],
            imageURL: "/img/banner/topbannertwo.jpg",
            swiperOption: {
                loop: false,
                duration: 5000,
                speed: 750,
                arrows: true,
                autoplay: false,
                slidesPerView: 1,
                spaceBetween: 10,
                pagination: {
                    el: ".swiper-pagination",
                    type: "progressbar"
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                breakpoints: {
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 26
                    }
                },
                on: {
                    slideChange: function () {
                        let lastVisibleItem = this.realIndex + this.params.slidesPerView
                        let slidesLength = this.slides.length - 2
                        let lastVisibleIndex = this.realIndex + this.params.slidesPerView
                        lastVisibleIndex === Number(self.fractionForm)
                            ? (self.activeColorArrow = true)
                            : (self.activeColorArrow = false)
                    }
                }
            },
            popularListing: [
                {
                    id: 1,
                    title: "Waterfront Bungalow at Ocean Drive",
                    imgURL: require(`../../../static/img/listing1.png`),
                    imgURLIconFirst: require(`../../../static/img/home-icon1.png`),
                    imgURLIconSecond: require(`../../../static/img/home-icon2.png`),
                    imgURLIconThird: require(`../../../static/img/home-icon3.png`),
                    address: "Ocean Drive, Singapore 098314",
                    totalBed: 4,
                    totalBath: 4
                },
                {
                    id: 2,
                    title: "Skypark @ Somerset",
                    imgURL: require(`../../../static/img/listing2.png`),
                    imgURLIconFirst: require(`../../../static/img/home-icon1.png`),
                    imgURLIconSecond: require(`../../../static/img/home-icon2.png`),
                    imgURLIconThird: require(`../../../static/img/home-icon3.png`),
                    address: "Ocean Drive, Singapore 098314",
                    totalBed: 4,
                    totalBath: 4
                },
                {
                    id: 3,
                    title: "Soleil @ Sinaran",
                    imgURL: require(`../../../static/img/listing3.png`),
                    imgURLIconFirst: require(`../../../static/img/home-icon1.png`),
                    imgURLIconSecond: require(`../../../static/img/home-icon2.png`),
                    imgURLIconThird: require(`../../../static/img/home-icon3.png`),
                    address: "Ocean Drive, Singapore 098314",
                    totalBed: 4,
                    totalBath: 4
                },
                {
                    id: 4,
                    title: "Skypark @ Somerset",
                    imgURL: require(`../../../static/img/listing2.png`),
                    imgURLIconFirst: require(`../../../static/img/home-icon1.png`),
                    imgURLIconSecond: require(`../../../static/img/home-icon2.png`),
                    imgURLIconThird: require(`../../../static/img/home-icon3.png`),
                    address: "Ocean Drive, Singapore 098314",
                    totalBed: 4,
                    totalBath: 4
                },
                {
                    id: 5,
                    title: "Soleil @ Sinaran",
                    imgURL: require(`../../../static/img/listing3.png`),
                    imgURLIconFirst: require(`../../../static/img/home-icon1.png`),
                    imgURLIconSecond: require(`../../../static/img/home-icon2.png`),
                    imgURLIconThird: require(`../../../static/img/home-icon3.png`),
                    address: "Ocean Drive, Singapore 098314",
                    totalBed: 4,
                    totalBath: 4
                }
            ],
            preNumber: 1,
            nextNumber: 3,
            fractionTo: 1,
            fractionForm: 3,
            activeColorArrow: false,
            index: 1,
            listTestTinyBox: [
                "../../../static/img/listing1.png",
                "../../../static/img/listing1.png",
                "../../../static/img/listing1.png",
                "../../../static/img/listing1.png"
            ],
            panel: [0, 1, 2, 3],
            activeHeart: false,
            index: null,
            loopCheckbox: false,
            listImages: [
                {
                    id: 1,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_1.jpeg`)
                },
                {
                    id: 2,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_2.jpeg`)
                },
                {
                    id: 3,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_3.jpeg`)
                },
                {
                    id: 4,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_4.jpeg`)
                }
            ],
            isOpenShareSocialDialog: false
            // listImages: [
            //     {
            //         src: "https://picsum.photos/id/13/500/1000",
            //         alt: "An empty beach",
            //         // thumbnail: "https://picsum.photos/id/13/200",
            //         caption: "Beach"
            //     },
            //     {
            //         src: "https://picsum.photos/id/42/1500/600",
            //         alt: "A café desk",
            //         caption: "Café"
            //     },
            //     {
            //         src: "https://picsum.photos/id/256/800/800",
            //         // thumbnail: "https://picsum.photos/id/256/200",
            //         caption: "Mountain range"
            //     },
            //     // "https://picsum.photos/id/69/800/600",
            //     // "https://picsum.photos/id/420/800/600"
            // ]
        }
    },
    mounted() {
        this.fractionForm = this.popularListing.length.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        this.fractionTo = this.fractionTo.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
    },
    methods: {
        closeShareSocialDialog() {
            this.isOpenShareSocialDialog = false
        }
    }
}
</script>
<style lang="scss" scoped>
.page__top {
    margin: 2.4rem 0 2.7rem;
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

    .page__content-left {
        padding-right: 8.2rem;
    }
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
.page__listing-content {
    // position: relative;
    .swiper-button-prev,
    .swiper-button-next {
        width: 1.8rem;
        height: 2.8rem;
        top: 2rem;
        right: 0;
        left: auto;
        &::after {
            font-size: 1.8rem;
            color: var(--color-primary);
            display: none;
        }
        &::before {
            content: "\ea6e";
            font-family: "remixicon" !important;
            font-style: normal;
            font-size: 1.8rem;
            color: var(--color-primary);
        }
    }
    .swiper-button-prev {
        right: 20.5rem;
        &::before {
            content: "\ea64";
        }
    }
    .swiper-pagination-progressbar {
        right: 6.8rem;
        left: auto;
        width: 9rem;
        height: 0.2rem;
        background-color: var(--border-color);
        :deep(.swiper-pagination-progressbar-fill) {
            background: var(--color-primary);
        }
    }
    .swiper-fraction {
        right: 5.5rem;
        span {
            font-size: 1.6rem;
            color: var(--color-title-black);
        }
        .fraction-to {
            color: var(--color-primary);
            position: absolute;
            top: 0;
            right: 12.6rem;
        }
    }
}
.expansion-panel-custom {
    border-bottom: 0.1rem solid var(--border-color);
    margin-top: 0;
    border-radius: 0 !important;
    .v-expansion-panel-header {
        font-weight: 700;
        font-size: 2rem;
        line-height: 2rem;
        padding: 0;
    }
    .v-expansion-panel-content {
        padding: 0 0 2.4rem;

        p {
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-title-black);
            &:nth-child(2) {
                margin-bottom: 0;
            }
        }
    }
    ::v-deep(.v-expansion-panel-content__wrap) {
        padding: 0;
    }
    &::before {
        box-shadow: none;
    }
}
.icon-custom {
    color: var(--color-primary) !important;
}
.expansion-property-row {
    display: flex;
    align-items: center;
    p {
        margin-bottom: 0;
        &:first-child {
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 3.2rem;
            color: var(--color-label);
            text-transform: capitalize;
            margin-right: 6.4rem;
            width: 14.1rem;
        }
        &:last-child {
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 3.2rem;
            color: var(--color-title-black);
            text-align: left;
        }
    }
}
.available-from-row {
    display: flex;
    align-items: center;
    i {
        background-color: var(--color-title-black);
        margin-right: 0.8rem;
    }
    p {
        margin-bottom: 0;
    }
}
.expansion-amenities-icon {
    display: flex;
    align-items: center;
    margin-bottom: 1.7rem;
    p {
        margin-bottom: 0;
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--color-title-black);
        text-transform: capitalize;
        margin-left: 1.2rem;
    }
}
.expansion-amenities-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.swiper-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding-top:
    padding-top: 60px;
}

.swiper-box {
    .swiper-box__top {
        position: relative;
        padding: 0 1.2rem;
        .swiper-box__image {
            img {
                width: 100%;
                object-fit: cover;
                border-radius: 2rem;
            }
        }
        .swiper-box__title {
            position: absolute;
            background-color: #edb842;
            padding: 2.2rem 1.6rem 2.5rem;
            bottom: 2.3rem;
            margin-bottom: 0;
            display: flex;
            align-items: center;
            left: -1.2rem;
            width: 85.9%;
            max-height: 7.5rem;
            box-sizing: border-box;
            .swiper-box__title-link {
                color: var(--color-white);
                font-size: 2rem;
                line-height: 2.8rem;
                text-align: left;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }
    .swiper-box__content {
        padding-top: 0.9rem;
        .swiper-box__content-first {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            p {
                margin-bottom: 0;
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2.4rem;
                color: var(--color-title-black);
                padding-left: 1rem;
            }
        }
        .swiper-box__content-second {
            display: flex;
            align-items: center;
            div {
                display: flex;
                align-items: center;
                p {
                    margin-bottom: 0;
                    margin-left: 0.8rem;
                    color: var(--color-title-black);
                }
                img {
                }
                &:first-child {
                    margin-right: 4.6rem;
                }
            }
        }
    }
}
.swiper-button-active {
    opacity: 1;
}
.page__content-left-back {
    margin-bottom: 2.1rem;
    display: inline-block;
    .btn-custom {
        display: flex;
        align-items: center;
        span {
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 2rem;
            margin-left: 0.4rem;
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
        margin-bottom: 1.3rem;

        h3 {
            font-weight: 800;
            font-size: 2rem;
            line-height: 2.6rem;
            color: #edb842;
            margin-bottom: 0;
        }
    }
    .page__content-left-info {
        margin-bottom: 2.5rem;
        .page__content-left-location {
            margin-bottom: 1rem;
        }
        .page__content-left-bed-bath {
            display: flex;
            align-items: center;
        }
        .page__content-left-bed {
            margin-right: 5.8rem;
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
.page__top-left-list-images {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 0.8rem;
    row-gap: 0.8rem;
    .page__top-left-column {
        cursor: pointer;
        &:nth-child(1) {
            grid-column-start: 1;
            grid-column-end: 4;
            grid-row-start: 1;
            grid-row-end: 2;
            img {
                height: auto;
            }
        }
        &:nth-child(2) {
            img {
                border-radius: 0 0 0 2rem;
            }
        }
        &:nth-child(4) {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                border-radius: 0 0 2rem 0;
            }
            span {
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2.4rem;
                color: var(--color-white);
                position: absolute;
                z-index: 10;
            }
            &::after {
                content: "";
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.6);
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 0 0 2rem 0;
                z-index: 7;
            }
        }
    }
}
.page__content-right-sticky {
    position: sticky;
    top: 8rem;
    z-index: 20;
}
.active-heart {
    &::before {
        content: "\EE0A";
        color: var(--color-primary);
    }
}
.page--project-detail-first {
    margin-bottom: 5.8rem;
}
</style>
