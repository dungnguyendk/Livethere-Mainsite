<template>
    <div v-if="source" class="section--life-style" id="life-style">
        <div class="container">
            <h4 class="section__header">Life Style</h4>
            <div class="section__container">
                <div class="section__left">
                    <LifeStyleExpanTow v-if="features.length > 0" :source="features" />
                </div>
                <div class="section__right">
                    <LifeStyleSectionCardContact :infoAgent="infoAgent" />
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
            features: [],
            
            infoAgent: {
                agentHeading: "",
                agentName: "",
                agentImage: "",
                agentPosition: "",
                agentPhone: "",
                agentMessage: "",
            }
        }
    },
    created() {
        const rawJSON = this.source ? this.source.details : []
        if (rawJSON.length > 0) {
            this.infoAgent.agentHeading = getStringByFieldName(rawJSON, "agent_heading")
            this.infoAgent.agentName = getStringByFieldName(rawJSON, "agent_name")
            this.infoAgent.agentImage = getImageURLByFieldName(rawJSON, "agent_image")
            this.infoAgent.agentPosition = getStringByFieldName(rawJSON, "agent_position")
            this.infoAgent.agentPhone = getStringByFieldName(rawJSON, "agent_phone")
            this.infoAgent.agentMessage = getStringByFieldName(rawJSON, "agent_message")
            const features = rawJSON.find((s) => s.fieldName === "features")
            if (features) {
                if (features.fieldValue !== "") {
                    const featuresRaw = JSON.parse(features.fieldValue)

                    this.features = featuresRaw.map((item) => {
                        return {
                            heading: getStringByFieldName(item.fields, "feature_heading"),
                            content: getStringByFieldName(item.fields, "feature_content")
                        }
                    })
                }
            }
            // console.log("this.agentPosition",this.infoAgent);
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
