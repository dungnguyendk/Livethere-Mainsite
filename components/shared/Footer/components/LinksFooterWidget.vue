<template lang="html">
    <div class="widget widget--footer widget--links">
        <div class="widget__top">
            <h3 class="widget__title">About livethere</h3>
        </div>
        <div class="widget__container">
            <!--            <template v-if="source">
                <nuxt-link v-for="(item, index) in source" :to="`/${item.linkURL}`">
                    {{ item.defaultName }}
                </nuxt-link>
            </template>-->
            <template>
                <a v-for="(link, index) in links" :href="link.url" :key="index">
                    {{ link.label }}
                </a>
                <a :class="openContactUsDialog ? 'active' : ''" @click="openContactUsDialog = true">
                    Contact us
                </a>
                <Dialog :open="openContactUsDialog" @close="closeDialog" :actions="false" :size="sizeDialog" :title="''">
                    <ContactUsForm @close="openContactUsDialog = false" :isContactUs="true" titleContact="Contact Us"
                        v-if="openContactUsDialog" />
                </Dialog>
            </template>
        </div>
    </div>
</template>

<script>
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import ContactUsForm from "~/components/shared/Header/Form/ContactUsForm.vue"
export default {
    name: "LinksFooterWidget",
    components: { Dialog, ContactUsForm },
    props: {
        source: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            sizeDialog: "medium",
            openContactUsDialog: false,
            links: [
                {
                    url: "https://www.livethere.com/tenants",
                    label: "Tenants"
                },
                {
                    url: "/privacy-policy",
                    label: "Privacy Policy"
                },
                {
                    url: "https://www.livethere.com/landlords",
                    label: "Landlords"
                },
                {
                    url: "/terms-n-conditions",
                    label: "Terms & Conditions"
                },
                {
                    url: "/about-us",
                    label: "About Us"
                },
            ]
        }
    },
    methods: {
        closeDialog() {
            this.openContactUsDialog = false
        }
    }
}
</script>
<style lang="scss" scoped>
.widget--footer {
    .widget__title {
        margin-top: 0.4rem;
        font-size: 2.2rem;
        margin-bottom: 2.5vh;
    }
}
.widget--links {
    .widget__container {
        grid-gap: 1.2rem;
        a {
            // font-size: 1.4rem;
        }
    }
}
</style>