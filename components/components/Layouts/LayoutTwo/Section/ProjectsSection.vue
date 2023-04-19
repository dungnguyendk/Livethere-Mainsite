<template lang="html">
    <div v-if="source" class="section--projects">
        <div class="container">
            <div class="section__content">
                <div class="sections__container">
                    <SectionProjectListing :source="projects" />
                    <SectionCallToAction
                        :heading="bannerHeading"
                        :content="bannerDescription"
                        :button-text="bannerButtonText"
                        :button-link="bannerButtonLink"
                    />
                </div>
                <div class="sections__container">
                    <SectionPosts :source="posts" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SectionCallToAction from "./components/SectionCallToAction.vue"
import SectionProjectListing from "./components/SectionProjectListing.vue"
import SectionPosts from "./components/SectionPosts.vue"
import { getImageURLByFieldName, getStringByFieldName } from "~/ultilities/fieldHelper"
import { httpEndpoint } from "~/services/https/endpoints"
export default {
    name: "ProjectsSection",
    components: {
        SectionCallToAction,
        SectionPosts,
        SectionProjectListing
    },

    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            title: "Services",
            bannerHeading: "",
            bannerDescription: "",
            bannerButtonText: "",
            bannerButtonLink: "",
            projects: [],
            posts: []
        }
    },
    created() {
        const rawJSON = this.source ? this.source.details : []
        if (rawJSON.length > 0) {
            this.bannerHeading = getStringByFieldName(rawJSON, "banner_heading")
            this.bannerDescription = getStringByFieldName(rawJSON, "banner_description")
            this.bannerButtonText = getStringByFieldName(rawJSON, "banner_button_text")
            this.bannerButtonLink = getStringByFieldName(rawJSON, "banner_button_link")
            const componentArr = rawJSON.find((s) => s.fieldName === "Projects")
            if (componentArr) {
                if (componentArr.fieldValue !== "") {
                    const componentRaw = JSON.parse(componentArr.fieldValue)
                    this.projects = componentRaw.map((item) => {
                        return {
                            name: getStringByFieldName(item.fields, "name"),
                            image: getImageURLByFieldName(item.fields, "image"),
                            description: getStringByFieldName(item.fields, "description"),
                            link: getStringByFieldName(item.fields, "link")
                        }
                    })
                }
            }
        }
        this.getData()
    },
    methods: {
        async getData() {
            const rawJSON = this.source ? this.source.details : []
            if (rawJSON.length > 0) {
                const componentArr1 = rawJSON.find((s) => s.fieldName === "Posts")
                this.getListID =
                    getStringByFieldName(rawJSON, "Posts") !== ""
                        ? JSON.parse(getStringByFieldName(rawJSON, "Posts"))
                        : []
                try {
                    const params = {
                        listID: this.getListID
                    }
                    const response = await this.$axios.$post(
                        `${httpEndpoint.blogs.getByListID}`,
                        params
                    )
                    if (response) {
                        this.posts = response
                    }
                } catch (e) {
                    this.posts = []
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.section__content {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    grid-column-gap: 1.7rem;
    padding: 5rem 0;

    @media screen and (max-width: 1279px) {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
