<template lang="html">
    <div
        v-if="source"
        class="section--landing section--youtube-video withBgColor"
        id="landing-videos"
    >
        <div class="container">
            <div class="section__top">
                <h3 class="section__title">{{ title }}</h3>
            </div>
            <div class="section__container">
                <div v-if="url !== ''" class="embed-responsive embed-responsive-16by9">
                    <iframe
                        class="embed-responsive-item"
                        width="100%"
                        height="500"
                        :src="url"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import { getStringByFieldName } from "~/ultilities/fieldHelper"

export default {
    name: "LandingVideoSection",
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            title: "Untitled",
            url: ""
        }
    },

    created() {
        const rawJSON = this.source ? this.source.details : []
        if (rawJSON.length > 0) {
            this.title = getStringByFieldName(rawJSON, "title")
            this.url = getStringByFieldName(rawJSON, "url")
        }
    }
}
</script>

<style lang="scss" scoped>
.section--youtube-video {
    .section__container {
        max-width: 94.4rem;
        margin: 0 auto;
    }
}
</style>
