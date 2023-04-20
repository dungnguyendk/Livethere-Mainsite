<template lang="html">
    <section v-if="source" class="section--home-cta" id="mainsite-call-to-action">
        <div class="section__container">
            <div class="section__background-image">
                <img :src="bgImage" alt="" />
            </div>
            <div class="section__overlay"></div>
            <div class="section__content">
                <h3 class="section__content-title"> {{ heading }}</h3>
                <v-btn
                    :to="button.url"
                    class="btn btn--primary section__content-button"
                    :style="{ backgroundColor: buttonBgColor }"
                    >{{ button.label }}
                </v-btn>
            </div>
        </div>
    </section>
</template>

<script>
import {
    getImageURLByFieldName,
    getMetadataByFieldName,
    getStringByFieldName
} from "~/ultilities/fieldHelper"

export default {
    name: "HomeCTASection",
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        rawJSON() {
            return this.source ? this.source.details : []
        },
        heading() {
            return getStringByFieldName(this.rawJSON, "heading") ?? "Heading text goes here"
        },
        button() {
            const linkData = JSON.parse(getMetadataByFieldName(this.rawJSON, "button"))
            return this.getLink(linkData)
        },
        buttonBgColor() {
            return getStringByFieldName(this.rawJSON, "button_background_color") ?? "#edb842"
        },
        bgImage() {
            return (
                getImageURLByFieldName(this.rawJSON, "background_image") ??
                "https://placehold.co/1000x400"
            )
        }
    },
    methods: {
        getLink(linkData) {
            if (linkData && linkData.linkInfo) {
                return {
                    label: linkData.linkInfo.label,
                    url: linkData.linkInfo.url,
                    openNewTab: linkData.linkInfo.openNewTab
                }
            } else {
                return null
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.section--home-cta {
    height: 25.4rem;
    border-bottom: 0.1rem solid var(--border-color);

    .section__container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 100%;

        .section__background-image {
            position: absolute;
            height: 100%;
            width: 100%;

            img {
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
        }

        .section__overlay {
            position: absolute;
            background-color: #000000;
            opacity: 0.55;
            width: 100%;
            height: 100%;
        }

        .section__content {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .section__content-title {
                font-weight: 900;
                font-size: 2.8rem;
                line-height: 3.8rem;
                text-align: center;
                color: var(--color-white);
                margin-bottom: 3.3rem;
            }

            .section__content-button {
                background-color: #edb842;
                width: 22rem;
                margin: 0 auto;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .section__container {
            .section__content {
                position: absolute;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .section__content-title {
                    font-weight: 900;
                    font-size: 1.8rem;
                    line-height: 2.8rem;
                    text-align: center;
                    color: var(--color-white);
                    margin-bottom: 3.3rem;
                }

                .section__content-button {
                    background-color: #edb842;
                    width: 22rem;
                    margin: 0 auto;
                }
            }
        }
    }
}
</style>
