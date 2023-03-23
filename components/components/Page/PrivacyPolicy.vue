<template>
    <div class="page--privacy-policy">
        <div class="container">
            <div class="page__wrapper">
                <PolicyTermsBox/>
            </div>
        </div>
    </div>
</template>

<script>
import PolicyTermsBox from "~/components/components/Page/components/Box/PolicyTermsBox.vue"
export default {
    name: "PrivacyPolicy",
    components: {
        PolicyTermsBox
    },
    data() {
        return {}
    },

    mounted() {},

    methods: {}
}
</script>

<style lang="scss" scoped>
</style>