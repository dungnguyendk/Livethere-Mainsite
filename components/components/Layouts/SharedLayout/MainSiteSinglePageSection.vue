<template lang="html">
    <div v-if="source" class="page--single">
        <div class="page__top">
            <div class="panel--page-hero">
                <div class="panel__container">
                    <div class="panel__background">
                        <img :src="backgroundImage" :alt="backgroundImage" />
                    </div>
                    <div class="panel__overlay" />
                    <div class="panel__content">
                        <h2 class="panel__title">
                            {{ title }}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div v-html="content" class="page__wrapper" />
        </div>
    </div>
</template>

<script>
import PolicyTermsBanner from "~/components/components/Page/components/Banner/PolicyTermsBanner.vue"
import { getImageURLByFieldName, getStringByFieldName } from "~/ultilities/fieldHelper"

export default {
    name: "MainSiteSinglePageSection",
    components: { PolicyTermsBanner },
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        sectionDetails() {
            return this.source ? this.source.details : []
        },

        content() {
            return getStringByFieldName(this.sectionDetails, "content") ?? ""
        },
        title() {
            return getStringByFieldName(this.sectionDetails, "title") ?? ""
        },

        backgroundImage() {
            return getImageURLByFieldName(this.sectionDetails, "background_image") ?? ""
        }
    }
}
</script>
<style lang="scss" scoped>
.panel--page-hero {
    height: 25.4rem;
    margin-top: -0.5rem;

    .panel__container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 100%;
    }

    .panel__overlay {
        position: absolute;
        background-color: #000000;
        opacity: 0.55;
        width: 100%;
        height: 100%;
    }

    .panel__background {
        position: absolute;
        height: 100%;
        width: 100%;

        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }

    .panel__content {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .panel__title {
        font-weight: 900;
        font-size: 2.8rem;
        line-height: 3.8rem;
        text-align: center;
        color: var(--color-white);
        margin-bottom: 3.3rem;
        text-transform: capitalize;
    }

    @media screen and (max-width: 768px) {
        .panel__content {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .panel__title {
            font-weight: 900;
            font-size: 1.8rem;
            line-height: 2.8rem;
            text-align: center;
            color: var(--color-white);
            margin-bottom: 3.3rem;
        }
    }
}
</style>
