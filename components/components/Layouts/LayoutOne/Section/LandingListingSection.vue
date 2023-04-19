<template>
    <div v-if="source" class="section--listing" id="campaign-listing">
        <div class="container">
            <h4 class="section__header"> {{ sectionHeading || "Listing" }} </h4>
            <div class="section__list">
                <ListingSectionBlockItem :source="listing" :productOnShow="productOnShow" />
            </div>
            <div class="section__action">
                <button class="read--more" v-if="listing.length > 2" @click="productOnShow += 2">
                    Read more
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import ListingSectionBlockItem from "~/components/components/Layouts/LayoutOne/Section/components/ListingSectionBlockItem.vue"
import { getImageURLByFieldName, getStringByFieldName } from "~/ultilities/fieldHelper"
export default {
    name: "LandingListingSection",

    components: {
        ListingSectionBlockItem
    },
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },

    data() {
        return {
            isRemore: false,
            sectionHeading: "",
            listing: [],
            productOnShow: 2
        }
    },
    created() {
        const rawJSON = this.source ? this.source.details : []
        this.sectionHeading = getStringByFieldName(rawJSON, "section_heading")
        if (rawJSON.length > 0) {
            const listing = rawJSON.find((s) => s.fieldName === "projects")
            if (listing) {
                if (listing.fieldValue !== "") {
                    const listingRaw = JSON.parse(listing.fieldValue)
                    if (process.client) {
                        if (window.matchMedia("(min-width: 1280px)").matches) {
                            this.productOnShow = listingRaw.length
                        }
                    }
                    this.listing = listingRaw.map((item) => {
                        return {
                            name: getStringByFieldName(item.fields, "name"),
                            description: getStringByFieldName(item.fields, "description"),
                            image: getImageURLByFieldName(item.fields, "image"),
                            Link: getStringByFieldName(item.fields, "link")
                        }
                    })
                }
            }
        }
    }
}
</script>
<style lang="scss">
.section--listing {
    padding: 2.8rem 0;
    .section__header {
        margin-bottom: 1.6rem;
        color: var(--color-menu);
        text-align: center;
        font-weight: 700;
        font-size: 2rem;
        line-height: 2.8rem;
    }
}
.section__action {
    text-align: center;
    display: none;

    .read--more {
        text-align: center;
        position: relative;
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2.2rem;
        color: var(--color-menu);
        &::after {
            content: "";
            border-right: 3px solid var(--color-menu);
            border-left: 3px solid transparent;
            border-top: 3px solid var(--color-menu);
            border-bottom: 3px solid transparent;
            position: absolute;
            top: 50%;
            transform: rotate(45deg) translateY(-50%);
        }
    }

    @media screen and (max-width: 1024px) {
        display: block;
    }
}
</style>
