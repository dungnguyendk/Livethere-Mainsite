<template>
    <div class="section__template">
        <LandlordRegister />
    </div>
</template>
<script>
import LandlordRegister from "~/components/components/Landlord/Auth/Register/LandlordRegister.vue"
export default {
    components: {
        LandlordRegister
    }
}
</script>
<style lang="scss" scoped>
.section__template {
    padding: 0 (278/1920)*100%;
}

@media only screen and (max-width: 768px) {
    .section__template {
        padding: 0 3rem;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1280px) {
    .section__template {
        padding: 0;
    }
}
</style>