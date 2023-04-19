<template>
    <div v-if="source" class="project--launches">
        <div class="container">
            <div class="project__content">
                <h2>Project Launches</h2>

                <div class="project__list" v-if="projects.length > 0">
                    <SectionProjectLaunchesList
                        class="items"
                        v-for="item in projects"
                        :key="item.id"
                        :imgUrl="item.image"
                        :title="item.name"
                        :date="item.time"
                    />
                </div>
                <button>Read more</button>
            </div>
        </div>
    </div>
</template>

<script>
import SectionProjectLaunchesList from "./components/SectionProjectLaunchesList.vue"
import { getImageURLByFieldName, getStringByFieldName } from "~/ultilities/fieldHelper"

export default {
    name: "ProjectLaunchesSection",

    components: {
        SectionProjectLaunchesList
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
            projects: []
        }
    },
    created() {
        const rawJSON = this.source ? this.source.details : []
        if (rawJSON.length > 0) {
            this.bannerHeading = getStringByFieldName(rawJSON, "banner_heading")
            this.bannerDescription = getStringByFieldName(rawJSON, "banner_description")
            this.bannerButtonText = getStringByFieldName(rawJSON, "banner_button_text")
            this.bannerButtonLink = getStringByFieldName(rawJSON, "banner_button_link")

            const componentArr = rawJSON.find((s) => s.fieldName === "projects")

            if (componentArr) {
                if (componentArr.fieldValue !== "") {
                    const componentRaw = JSON.parse(componentArr.fieldValue)
                    this.projects = componentRaw.map((item) => {
                        return {
                            name: getStringByFieldName(item.fields, "name"),
                            image: getImageURLByFieldName(item.fields, "image"),
                            description: getStringByFieldName(item.fields, "description"),
                            time: getStringByFieldName(item.fields, "time")
                        }
                    })
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.project--launches {
    padding-bottom: 5rem;
}

.project__content {
    position: relative;

    h2 {
        font-weight: 700;
        color: var(--color-menu);
        font-size: 2rem;
        line-height: 2.8rem;
        margin-bottom: 2rem;

        @media screen and (max-width: 1279px) {
            font-size: 1.8rem;
            line-height: 2.2rem;
            margin-bottom: 1.8rem;
        }
    }

    button {
        font-size: 1.6rem;
        line-height: 2.4rem;
        font-weight: 700;
        color: var(--color-menu);
        position: absolute;
        right: 0;
        top: 0;
        padding-right: 1rem;

        @media screen and (max-width: 1279px) {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
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

    .project__list {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
        grid-column-gap: 1.6rem;

        @media screen and (max-width: 1280px) {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            grid-column-gap: 1.2rem;
        }

        @media screen and (max-width: 768px) {
            grid-template-columns: minmax(0, 1fr);
            grid-column-gap: 0;
            .items:nth-child(n + 3) {
                display: none;
            }
        }
    }
}
</style>
