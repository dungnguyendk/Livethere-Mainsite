<template>
    <div class="page--privacy-policy">
        <PolicyTermsBanner>{{ title }}</PolicyTermsBanner>
        <div class="container">
            <div v-html="dummyData" class="page__wrapper"></div>
        </div>
    </div>
</template>

<script>
import { PRIVACY_POLICY } from "~/ultilities/contants/dummy-data"
import PolicyTermsBanner from "~/components/components/Page/components/Banner/PolicyTermsBanner.vue"
export default {
    name: "PrivacyPolicy",
    components: { PolicyTermsBanner },
    data() {
        return {
            dummyData: PRIVACY_POLICY.data,
            title: "privacy policy"
        }
    },
    methods: {}
}
</script>

<style lang="scss" scoped>

</style>