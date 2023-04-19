<template lang="html">
    <div class="widget widget--footer widget--about">
        <SiteLogo />

        <template v-if="address === '' && agencyNo === ''">
            <p> Savills Singapore Agency No.: L3009688B </p>
            <p>30 Cecil Street, #20-03 Prudential Tower, Singapore 049712</p>
        </template>
        <template v-else>
            <p>{{ agencyNo }}</p>
            <p>{{ address }}</p>
        </template>
    </div>
</template>

<script>
import SiteLogo from "~/components/shared/Logo/SiteLogo.vue"

export default {
    name: "InformationFooterWidget",
    components: { SiteLogo },
    props: {
        address: {
            type: String,
            default: ""
        },
        agencyNo: {
            type: String,
            default: ""
        }
    }
}
</script>
<style lang="scss" scoped>
.widget--footer {
    display: block;

    :deep(img) {
        width: 20rem;
        margin-bottom: 3rem;
    }

    p {
        font-size: 1.4rem;
        margin-bottom: 1.6rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
