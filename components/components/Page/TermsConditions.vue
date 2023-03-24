<template>
    <div class="page--terms-conditions">
        <PolicyTermsBanner>{{ title }}</PolicyTermsBanner>
        <div class="container">
            <div v-html="dummyData" class="page__wrapper"></div>
        </div>
    </div>
</template>

<script>
import PolicyTermsBanner from "~/components/components/Page/components/Banner/PolicyTermsBanner.vue"
import { TERMS_CONDITIONS } from "~/ultilities/contants/dummy-data"
export default {
    name: "TermsConditions",
    components: { PolicyTermsBanner },
    data() {
        return {
            title: "terms & conditions",
            dummyData: TERMS_CONDITIONS.data
        }
    },

    mounted() {},

    methods: {}
}
</script>
<style lang="scss" scoped>

</style>
