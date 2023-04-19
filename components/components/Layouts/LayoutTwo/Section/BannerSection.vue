<template>
    <div v-if="source" class="section--banner">
        <div class="">
            <swiper class="swiper" :options="swiperOption" :pagination="true">
                <swiper-slide v-for="item in banners" :key="item.id">
                    <div class="swiper__block">
                        <div >
                            <img class="swiper__image" :src="item.image" :alt="item.image" />
                        </div>

                        <div class="section__description">
                            <h3>{{ item.heading }}</h3>

                            <button>{{ item.linkLabel }}</button>
                            <!-- <div class="swiper-pagination" slot="pagination"> </div> -->
                        </div>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper"
import "swiper/css/swiper.css"
import { getImageURLByFieldName, getStringByFieldName } from "~/ultilities/fieldHelper"
export default {
    name: "BannerSection",

    components: {
        Swiper,
        SwiperSlide
    },
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            banners: [],
            swiperOption: {
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '"></span>'
                    }
                }
            }
        }
    },
    created() {
        const rawJSON = this.source ? this.source.details : []
        if (rawJSON.length > 0) {
            const componentArr = rawJSON.find((s) => s.fieldName === "banners")
            //console.log({ componentArr })

            if (componentArr) {
                this.banners = componentArr.fieldValues
            }
            if (componentArr) {
                if (componentArr.fieldValue !== "") {
                    const componentRaw = JSON.parse(componentArr.fieldValue)
                    this.banners = componentRaw.map((item) => {
                        return {
                            heading: getStringByFieldName(item.fields, "heading"),
                            image: getImageURLByFieldName(item.fields, "image"),
                            linkLabel: getStringByFieldName(item.fields, "link_label"),
                            linkURl: getStringByFieldName(item.fields, "link_url")
                        }
                    })
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.section--banner {
    background-color: #fafafa;
    .swiper__image {
        width: 100%;
    }

    .section__description {
        align-self: center;
        background-color: #fafafa;
        h3 {
            font-size: 4rem;
            font-weight: 700;
            font-family: var(--font-second);
            line-height: 6rem;
            margin-bottom: 5.6rem;
            color: #0b0c0c;

            @media screen and (max-width: 1024px) {
                font-size: 3.2rem;
                line-height: 4.1rem;
                margin-bottom: 1.3rem;
            }
        }

        button {
            font-size: 1.6rem;
            line-height: 2.4rem;
            font-weight: 700;
            color: var(--color-menu);
            position: relative;
            padding-right: 1rem;

            @media screen and (max-width: 1024px) {
                position: relative;
                left: 0;
            }

            &::before {
                content: "";
                border: 4px solid var(--color-menu);
                border-bottom: 4px solid transparent;
                border-left: 4px solid transparent;
                transform: translateY(-50%) rotate(45deg);
                position: absolute;
                top: 50%;
                right: 0;
            }
        }

        @media screen and (max-width: 1024px) {
            padding: 1.5rem 1.6rem 0rem;
        }
    }
}
.swiper__block {
    display: grid;
    grid-template-columns: minmax(0, 1.8fr) minmax(0, 1fr);
    grid-column-gap: 5.4rem;
    position: relative;

    @media screen and (max-width: 1024px) {
        grid-gap: 3rem;
        grid-template-columns: minmax(0, 1fr);
    }
}

.swiper-pagination {
    bottom: 1.8rem;
    text-align: left;
    left: calc(68% - 5.4rem);
    position: absolute;
    @media screen and (max-width: 1024px) {
        bottom: 10.5rem;
        position: relative;
        left:0;
        text-align: center;
    }
    @media screen and (max-width: 768px) {
        bottom: 14.5rem;
        position: relative;
        left:0;
        text-align: center;
    }
    @media screen and (max-width: 425px) {
        bottom: 19rem;
        position: relative;
        left:0;
        text-align: center;
    }
}

:deep(.swiper-pagination-bullet) {
    width: 1rem;
    height: 1rem;
    background-color: #828586;
    opacity: 0.3;
    margin-right: 0.8rem;
}
:deep(.swiper-pagination-bullet-active) {
    opacity: unset;
}
</style>
