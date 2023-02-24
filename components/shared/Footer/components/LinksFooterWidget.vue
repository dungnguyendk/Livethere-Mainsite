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
                <a v-for="(link, index) in links" :href="link.url" :key="index" target="_blank">
                    {{ link.label }}
                </a>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "LinksFooterWidget",
    props: {
        source: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
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
                {
                    url: "https://www.livethere.com/",
                    label: "Contact Us"
                }
            ]
        }
    }
}
</script>
