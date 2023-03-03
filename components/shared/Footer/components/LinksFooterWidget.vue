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
                    url: "https://www.livethere.com/privacy-policy",
                    label: "Privacy"
                },
                {
                    url: "https://www.livethere.com/landlords",
                    label: "Landlords"
                },
                {
                    url: "https://www.livethere.com/terms-n-conditions",
                    label: "Terms & Conditions"
                },
                {
                    url: "https://www.livethere.com/about-us",
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
