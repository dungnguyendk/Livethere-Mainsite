<template lang="html">
    <div class="widget widget--footer widget--about">
        <SiteLogo />
        <p v-if="address && address !== ''"> {{ address }}</p>
        <template v-else>
            <p>
                Savills Singapore Agency No.: L3009688B 30 Cecil Street, #20-03 Prudential Tower,
                Singapore 049712
            </p>
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
            default: ''
        }
    }
}
</script>
