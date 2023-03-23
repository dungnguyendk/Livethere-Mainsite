<template>
    <div>
        <InspriedUsVue />
        <PropertyConciergeVue />
        <ServicesVue />
        <WorkThere />
    </div>
</template>

<script>
import InspriedUsVue from "./InspriredUs/InspriedUs.vue"
import PropertyConciergeVue from "./PropertyConcierge/PropertyConcierge.vue"
import ServicesVue from "./Services/Services.vue"
import WorkThere from "./WorkThere/WorkThere.vue"
export default {
    components: {
        InspriedUsVue,
        PropertyConciergeVue,
        ServicesVue,
        WorkThere
    },
    name: "AboutUs"
}
</script>

<style lang="scss" scoped>
// .container{
//     background-color: var(--bg-color-white);
// }
</style>
