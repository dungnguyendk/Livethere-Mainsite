<template>
    <main>
        <LandlordVerification />
    </main>
</template>

<script>
import { mapState } from "vuex"
import PropertyDetails from "~/components/components/Landlord/Property/PropertyDetails.vue"
import LandlordVerification from "~/components/components/Landlord/Auth/SignIn/LandlordVerification.vue"
export default {
    components: { LandlordVerification },
    head: {
        title: "Landing page | Livethere"
    },

    methods: {}
}
</script>
