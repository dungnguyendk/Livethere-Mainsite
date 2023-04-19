<template>
    <div v-if="source" class="section--life-style" id="life-style">
        <div class="container">
            <h4 class="section__header">{{ sectionTitle }}</h4>
            <div class="section__container">
                <div class="section__left">
                    <LifeStyleExpanTow v-if="features.length > 0" :source="features" />
                </div>
                <div class="section__right">
                    <LifeStyleSectionCardContact :infoAgent="agentInfo" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LifeStyleSectionExpansionTab from "~/components/components/Layouts/LayoutOne/Section/components/LifeStyleSectionExpansionTab.vue"
import LifeStyleSectionCardContact from "~/components/components/Layouts/LayoutOne/Section/components/LifeStyleSectionCardContact.vue"
import LifeStyleExpanTow from "~/components/components/Layouts/LayoutOne/Section/components/LifeStyleExpanTow"
import { getImageURLByFieldName, getStringByFieldName } from "~/ultilities/fieldHelper"

export default {
    name: "LandingLifeStyleSection",
    components: {
        LifeStyleSectionExpansionTab,
        LifeStyleSectionCardContact,
        LifeStyleExpanTow
    },
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
            cachedFeatures: null,
            infoAgent: {
                agentHeading: "",
                agentName: "",
                agentImage: "",
                agentPosition: "",
                agentPhone: "",
                agentMessage: ""
            }
        }
    },

    computed: {
        sectionDetails() {
            return this.source ? this.source.details : []
        },
        sectionTitle() {
            return getStringByFieldName(this.sectionDetails, "section_title")
        },
        agentHeading() {
            return getStringByFieldName(this.sectionDetails, "agent_heading")
        },
        agentName() {
            return getStringByFieldName(this.sectionDetails, "agent_name")
        },
        agentImage() {
            return getImageURLByFieldName(this.sectionDetails, "agent_image")
        },
        agentPosition() {
            return getStringByFieldName(this.sectionDetails, "agent_position")
        },
        agentPhone() {
            return getStringByFieldName(this.sectionDetails, "agent_phone")
        },
        features() {
            const features = this.sectionDetails.find((s) => s.fieldName === "features")
            if (features) {
                if (features.fieldValue !== "") {
                    const featuresRaw = JSON.parse(features.fieldValue)
                    return featuresRaw.map((item) => {
                        return {
                            heading: getStringByFieldName(item.fields, "feature_heading"),
                            content: getStringByFieldName(item.fields, "feature_content")
                        }
                    })
                }
            }
        },
        agentInfo() {
            return {
                agentHeading: this.agentHeading,
                agentName: this.agentName,
                agentImage: this.agentImage,
                agentPosition: this.agentPosition,
                agentPhone: this.agentPhone,
                agentMessage: this.agentMessage
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.section--life-style {
    padding: 2.8rem 0;
}

.section__container {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);

    @media screen and (max-width: 1024px) {
        grid-template-columns: minmax(0, 1fr);
    }
}

.section__header {
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.8rem;
    color: var(--color-menu);
    text-align: center;
    margin-bottom: 1.6rem;
}

.section__left {
    padding-right: 1.6rem;

    @media screen and (max-width: 1024px) {
        padding-right: 0;
        margin-bottom: 3.2rem;
    }

    @media screen and (max-width: 768px) {
        margin-bottom: 2.4rem;
    }
}
</style>
