<template lang="html">
    <form @submit.prevent="onFormSubmit" class="form--landlord form--add-unit-inventory">
        <p class="alert alert--red" v-if="!statusResponse">Something when wrong</p>
        <div class="form__fields">
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Tenancy Name</label>
                        <v-text-field v-model="tenancyName" dense outlined :error-messages="tenancyNameErrors" />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Leasing Type</label>
                        <v-select v-model="leasingType" :items="leasingTypes" item-text="text" item-value="value"
                            placeholder="Please select" dense outlined :error-messages="leasingTypeErrors" />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>ID / Passport No.</label>
                        <v-text-field v-model="passportNo" dense outlined :error-messages="passportNoErrors" />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Company Name</label>
                        <v-text-field v-model="companyName" dense outlined :error-messages="companyNameErrors" />
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
            <v-btn class="btn btn--primary btn--green btn--sm" @click="onCreateTenancyInfo"
                :loading="loading">Create</v-btn>
        </div>
    </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, requiredIf } from "vuelidate/lib/validators"
import { setFormControlErrors } from "~/ultilities/form-validations"
import { mapState } from 'vuex'
import qs from "qs"
export default {
    name: "AddTenancyInfoForm",
    mixins: [validationMixin],
    validations: {
        tenancyName: { required },
        leasingType: { required },
        passportNo: { required },
        companyName: {
            required: requiredIf(function () {
                return this.leasingType.name === "Corporate"
            }),
        },
    },
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
            ],
            loading: false,
        }
    },
    computed: {
        ...mapState({
            tenancyDetailByInternalID: (state) => state.tenancy.tenancyDetailByInternalID,
            statusResponse: (state) => state.tenancy.statusResponse,
        }),
        tenancyNameErrors() {
            return setFormControlErrors(this.$v.tenancyName, "This Tenancy Name is required")
        },
        leasingTypeErrors() {
            return setFormControlErrors(this.$v.leasingType, "This Leasing Type is required")
        },
        passportNoErrors() {
            return setFormControlErrors(this.$v.passportNo, "This ID / Passport No. is required")
        },
        companyNameErrors() {
            return setFormControlErrors(this.$v.companyName, "This Company Name is required")
        }
    },
    mounted() {
        // console.log("this.tenancyDetailByInternalID", this.tenancyDetailByInternalID)
    },
    methods: {
        onFormSubmit() { 
            this.loading = true
        },
        onClose() {
            this.$emit("close")
        },
        onCreateTenancyInfo() {
            this.onFormSubmit()
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const params = {
                    tenancyContractAgreementFID: this.tenancyDetailByInternalID.id,
                    tenancyName: this.tenancyName,
                    tenancyIdentityDocNo: this.passportNo,
                    leasingTypeFID: this.leasingType.id,
                    leasingTypeDisplay: this.leasingType.name,
                    companyName: this.companyName,
                    remark: this.remark
                }
                this.$store.dispatch("tenancy/createTenancyTenantInfos", params).then(() => {
                    const paramAgreementFID = qs.stringify({
                        TenancyContractAgreementFID: this.tenancyDetailByInternalID.id
                    })
                    this.$store.dispatch("tenancy/getTenancyInfosById", paramAgreementFID)
                }).then(() => {
                    this.loading = false
                    if (this.statusResponse) {
                        this.onClose()
                    }
                })
            } else {
                this.loading = false
            }
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
