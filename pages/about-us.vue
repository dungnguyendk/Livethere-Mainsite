<template>
    <div class="about-us">
        <AboutUsVue />
    </div>
</template>

<script>
import AboutUsVue from "~/components/components/AboutUs/AboutUs.vue"
export default {
    layout: "landlord",
    components: {
        AboutUsVue
    }
}
</script>

<style>
.about-us{
    background-color: var(--bg-color-white);
}
</style>
