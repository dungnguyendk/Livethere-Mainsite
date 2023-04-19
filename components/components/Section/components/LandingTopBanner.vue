<template lang="html">
    <div v-if="source" class="section--landing section--youtube-video" id="campaign-banner">
        <div class="banner">
            <img :src="imageURL" :alt="title" />
            <div class="banner__container">
                <div class="banner__content">
                    <h2 class="banner__title">
                        {{ title }}
                    </h2>
                    <p>
                        {{ description }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getImageURLByFieldName, getStringByFieldName } from "~/ultilities/fieldHelper"

export default {
    name: "LandingTopBanner",
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },

    data() {
        return {
            imageURL: "/img/banner/topbanner.jpg",
            title: "Untitled",
            description:
                "Featuring a highly coveted colection of luxury homes in Singapore’s tropical sanctuary"
        }
    },
    created() {
        const rawJSON = this.source ? this.source.details : []
        if (rawJSON.length > 0) {
            this.imageURL = getImageURLByFieldName(rawJSON, "background_image")
            this.description = getStringByFieldName(rawJSON, "description")
            this.title = getStringByFieldName(rawJSON, "title")
        }
    }
}
</script>

<style lang="scss" scoped>
.banner {
    position: relative;
    z-index: 9;

    img {
        width: 100%;
    }
    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(#000, 0.24);
        z-index: 10;
    }

    .banner__container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: calc(100% - 20%);
        z-index: 99;
    }

    .banner__content {
        max-width: 58rem;

        h2 {
            margin-bottom: 3rem;
            font-family: var(--font-second);
            font-size: 4rem;
            font-weight: 700;
            line-height: 1em;
            color: #fff;
        }

        p {
            margin-bottom: 0;
            font-size: 2.4rem;
            font-weight: 500;
            line-height: 1.2em;
            color: #fff;
        }
    }

    @media screen and (max-width: 479px) {
        .banner__container {
            background-color: var(--color-white);
            position: relative;
            top: 0;
            left: 0;
            width: 100%;
            max-width: 100%;
            transform: translate(0, 0);
            padding: 1.2rem 2.4rem;
        }
        .banner__content {
            h2,
            p {
                color: var(--color-heading);
            }

            h2 {
                font-size: 2.4rem;
                margin-bottom: 1.6rem;
            }

            p {
                font-size: 1.4rem;
            }
        }
    }
}
</style>
