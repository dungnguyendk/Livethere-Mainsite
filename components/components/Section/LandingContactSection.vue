<template lang="html">
    <div v-if="source" class="section--landing section--landing-contact" id="landing-contact-form">
        <div class="container">
            <div class="section__top">
                <h3 class="section__title">{{ title }}</h3>
            </div>
            <div class="section__container">
                <LandingContactForm />
            </div>
        </div>
    </div>
</template>

<script>
import form from "nuxt-dropzone"
import LandingContactForm from "~/components/components/Section/components/Form/LandingContactForm.vue"
import { getStringByFieldName } from "~/ultilities/fieldHelper"

export default {
    name: "LandingContactSection",
    components: { LandingContactForm },

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
        }
    }
}
</script>
<style lang="scss" scoped>
.section--landing-contact {
    padding: 6.4rem 0;
    background-color: #f7ebe3;

    .section__container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
