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
            <template >
                <nuxt-link v-for="(link, index) in links" :to="link.url" :key="index">
                    {{ link.label }}
                </nuxt-link>
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
                    url: "/",
                    label: "Tenants"
                },
                {
                    url: "/",
                    label: "Privacy"
                },
                {
                    url: "/",
                    label: "Landlords"
                },
                {
                    url: "/",
                    label: "Terms & Conditions"
                },
                {
                    url: "/",
                    label: "About Us"
                },
                {
                    url: "/",
                    label: "Contact Us"
                }
            ]
        }
    }
}
</script>
