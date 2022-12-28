<template lang="html">
    <form class="form--landlord form--add-unit-inventory">
        <div class="form__fields">
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Tenancy Name</label>
                        <v-text-field v-model="tenancyName" dense outlined />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Leasing Type</label>
                        <v-select v-model="leasingType" :items="leasingTypes" item-text="text" item-value="value"
                            placeholder="Please select" dense outlined />
                            {{ leasingType }}
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>ID / Passport No.</label>
                        <v-text-field v-model="passportNo" dense outlined />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Company Name</label>
                        <v-text-field v-model="companyName" dense outlined />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                    <div class="form__field">
                        <label>Remark</label>
                        <v-textarea v-model="remark" dense outlined />
                    </div>
                </v-col>
            </v-row>
        </div>
        <div class="form__actions">
            <v-btn class="btn btn--ghost btn--gray btn--sm" @click="onClose">Cancel</v-btn>
            <v-btn class="btn btn--primary btn--green btn--sm">Create</v-btn>
        </div>
    </form>
</template>

<script>
export default {
    name: "AddTenancyInfoForm",
    data() {
        return {
            tenancyName: "",
            leasingType: "",
            passportNo: "",
            companyName: "",
            remark: "",
            leasingTypes: [
                {
                    value: {
                        id: 1,
                        name: "Personal"
                    },
                    text: "Personal"
                },
                {
                    value: {
                        id: 2,
                        name: "Corporate"
                    },
                    text: "Corporate"
                }
            ]
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
.form--add-unit-inventory {
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
