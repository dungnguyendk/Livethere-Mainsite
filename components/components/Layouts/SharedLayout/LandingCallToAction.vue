<template lang="html">
    <div v-if="source" class="section--call-to-action">
        <div class="section__img">
            <img :src="image" alt="" />
        </div>
        <div class="section__content">
            <p
                >{{ firstText }}
                <NuxtLink :to="firstLink.url" :target="firstLink.openNewTab ? '_blank' : '_self'">{{
                    firstLink.label
                }}</NuxtLink>
                <br />
                {{ secondText }}
                <NuxtLink
                    :to="secondLink.url"
                    :target="secondLink.openNewTab ? '_blank' : '_self'"
                    >{{ secondLink.label }}</NuxtLink
                >
            </p>
            <v-btn
                :to="button.url"
                class="btn btn--primary"
                :style="{ backgroundColor: buttonBgColor }"
                >{{ button.label }}</v-btn
            >
        </div>
    </div>
</template>

<script>
import {
    getImageURLByFieldName,
    getStringByFieldName,
    getMetadataByFieldName
} from "~/ultilities/fieldHelper"

export default {
    name: "LandingCallToActions",
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            // firstText: "all vectors",
            // secondText: "",
            // firstLink: null,
            // secondLink: null,
            // button: null,
            // buttonBgColor: "",
            // image: ""
        }
    },
    computed: {
        rawJSON() {
            return this.source ? this.source.details : []
        },
        firstText() {
            const text = getStringByFieldName(this.rawJSON, "first_text")
            return text ? text : ""
        },
        firstLink() {
            const linkData = JSON.parse(getMetadataByFieldName(this.rawJSON, "first_link"))
            // console.log("this.getLinkByFieldName", this.getLink(linkData))
            return this.getLink(linkData)
        },
        secondText() {
            return getStringByFieldName(this.rawJSON, "second_text")
        },
        secondLink() {
            const linkData = JSON.parse(getMetadataByFieldName(this.rawJSON, "second_link"))
            return this.getLink(linkData)
        },
        button() {
            const linkData = JSON.parse(getMetadataByFieldName(this.rawJSON, "button"))
            return this.getLink(linkData)
        },
        buttonBgColor() {
            return getStringByFieldName(this.rawJSON, "button_background_color")
        },
        image() {
            return getImageURLByFieldName(this.rawJSON, "background_image")
        }
    },
    created() {
        // const rawJSON = this.source ? this.source.details : []
        // if (rawJSON.length > 0) {
        //     this.firstText = getStringByFieldName(rawJSON, "first_text")
        //         ? getStringByFieldName(rawJSON, "first_text")
        //         : ""
        //     if (getMetadataByFieldName(rawJSON, "first_link") !== "") {
        //         this.renderFirstLinkData(JSON.parse(getMetadataByFieldName(rawJSON, "first_link")))
        //     }
        //     this.secondText = getStringByFieldName(rawJSON, "second_text")
        //     if (getMetadataByFieldName(rawJSON, "second_link") !== "") {
        //         this.renderSecondLinkData(
        //             JSON.parse(getMetadataByFieldName(rawJSON, "second_link"))
        //         )
        //     }
        //     if (getMetadataByFieldName(rawJSON, "button") !== "") {
        //         this.renderThirdLinkData(JSON.parse(getMetadataByFieldName(rawJSON, "button")))
        //     }
        //     this.buttonBgColor = getStringByFieldName(rawJSON, "button_background_color")
        //     this.image = getImageURLByFieldName(rawJSON, "background_image")
        // }
    },
    methods: {
        // renderFirstLinkData(linkData) {
        //     if (linkData.linkInfo) {
        //         this.firstLink = {
        //             label: linkData.linkInfo.label,
        //             url: linkData.linkInfo.url,
        //             openNewTab: linkData.linkInfo.openNewTab
        //         }
        //     } else {
        //         this.firstLink = null
        //     }
        // },
        // renderSecondLinkData(linkData) {
        //     if (linkData.linkInfo) {
        //         this.secondLink = {
        //             label: linkData.linkInfo.label,
        //             url: linkData.linkInfo.url,
        //             openNewTab: linkData.linkInfo.openNewTab
        //         }
        //     } else {
        //         this.secondLink = null
        //     }
        // },
        // renderThirdLinkData(linkData) {
        //     if (linkData.linkInfo) {
        //         this.button = {
        //             label: linkData.linkInfo.label,
        //             url: linkData.linkInfo.url,
        //             openNewTab: linkData.linkInfo.openNewTab
        //         }
        //     } else {
        //         this.button = null
        //     }
        // }
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
.section--call-to-action {
    position: relative;
    padding: 2rem 2rem 0 2rem;
    height: 25.4rem;
    .section__img {
        // position: relative;
        &::after {
            content: "";
            position: absolute;
            z-index: 2;
            background: rgba(0, 0, 0, 0.55);
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            // height: 100%;
        }
        img {
            // width: 100%;
            z-index: 1;
            height: auto;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            object-fit: cover;
            object-position: center;
            height: 100%;
        }
    }

    .section__content {
        position: absolute;
        z-index: 3;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        p {
            margin-bottom: 1.2rem;
            width: 100%;
            font-weight: 700 !important;
            font-size: 2rem;
            line-height: 2em;
            text-align: center;
            color: var(--color-white);
            white-space: nowrap;
        }
        a {
            font-weight: 700 !important;
            font-size: 2rem;
            line-height: 2em;
            color: var(--bg-btn);
            text-decoration: underline;
        }
        .btn {
            min-width: 17.6rem;
            height: 4.4rem;
            text-align: center;
            text-decoration: none;
            padding-top: 1rem;
        }
        .btn::v-deep(.v-btn__content) {
            font-family: var(--font-family);
            font-style: normal;
            font-size: 1.6rem;
            line-height: 1.375em;
        }
    }
}
</style>
