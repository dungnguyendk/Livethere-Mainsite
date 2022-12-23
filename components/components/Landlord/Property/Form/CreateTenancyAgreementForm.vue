<template lang="html">
    <form class="form form--create-tenancy-agreement">
        <div class="form__fields">
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Agreement Date </label>
                        <v-text-field v-model="agreementDate" dense outlined />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Start Date </label>
                        <v-text-field v-model="startDate" dense outlined />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>End Date </label>
                        <v-text-field v-model="endDate" dense outlined />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Monthly Rental </label>
                        <v-text-field v-model="monthlyRental" dense outlined />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                    <div class="form__field">
                        <label>Secure Deposit </label>
                        <v-text-field v-model="secureDeposit" dense outlined />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                    <div class="form__field">
                        <label>Remark </label>
                        <v-textarea v-model="remark" dense outlined />
                    </div>
                </v-col>
            </v-row>
        </div>
        <div class="form__actions">
            <v-btn class="btn btn--ghost btn--gray btn--sm" @click="onClose"> Cancel</v-btn>
            <v-btn class="btn btn--primary btn--green btn--sm"> Create</v-btn>
        </div>
    </form>
</template>

<script>
export default {
    name: "CreateTenancyAgreementForm",

    data() {
        return {
            agreementDate: "",
            startDate: "",
            endDate: "",
            monthlyRental: "",
            secureDeposit: "",
            remark: ""
        }
    },
    methods: {
        onClose() {
            this.$emit("close")
        }
    }
}
</script>
<style lang="scss" scoped>
.form--create-tenancy-agreement {
    .form__actions {
        display: flex;
        justify-content: center;
        align-items: center;
        grid-gap: 1.2rem;
        gap: 1.2rem;

        .btn {
            min-width: 12rem;
        }
    }
}
</style>
