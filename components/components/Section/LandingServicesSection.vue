<template lang="html">
    <div v-if="source" class="section--landing-services withBgColor">
        <div class="container">
            <div class="section__top">
                <h3 class="section__title"> {{ title }} </h3>
            </div>
            <div class="section__container">
                <div class="container">
                    <div v-if="services.length > 0" class="section__items">
                        <SectionService
                            v-for="service in services"
                            :color="service.color"
                            :title="service.title"
                            :desc="service.description"
                            :image="service.image"
                        />
                    </div>
                    <p v-else class="empty"> No services found. </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import SectionService from "~/components/components/Section/components/SectionService.vue"
import { getImageURLByFieldName, getStringByFieldName } from "~/ultilities/fieldHelper"

export default {
    name: "LandingServicesSection",
    components: { SectionService },
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            title: "Services",
            services: []
        }
    },
    created() {
        const rawJSON = this.source ? this.source.details : []
        if (rawJSON.length > 0) {
            this.title =
                getStringByFieldName(rawJSON, "title") !== ""
                    ? getStringByFieldName(rawJSON, "title")
                    : "Untitled"
            const serviceValueArr = rawJSON.find((s) => s.fieldName === "services")

            if (serviceValueArr) {
                const servicesItemsRaw = JSON.parse(serviceValueArr.fieldValue)
                this.services = servicesItemsRaw.map((item) => {
                    return {
                        title: getStringByFieldName(item.fields, "title"),
                        color: getStringByFieldName(item.fields, "color"),
                        image: getImageURLByFieldName(item.fields, "image"),
                        description: getStringByFieldName(item.fields, "description")
                    }
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.section--landing-services {
    .section__top {
        text-align: center;
        padding-bottom: 3.6rem;

        .section__title {
            margin-bottom: 0;
            font-family: var(--font-second);
            font-weight: 700;
            font-size: 2rem;
            color: var(--color-primary);
        }
    }

    .section__items {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        grid-gap: 1.6rem;
    }

    @media screen and (max-width: 991px) {
        .section__items {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-row-gap: 3.6rem;
        }
    }

    @media screen and (max-width: 479px) {
        .section__items {
            grid-template-columns: repeat(1, minmax(0, 1fr));
        }
    }
}
</style>
