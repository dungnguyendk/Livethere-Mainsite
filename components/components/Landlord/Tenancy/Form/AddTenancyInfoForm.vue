<template lang="html">
    <form @submit.prevent="onFormSubmit" class="form--landlord form--add-unit-inventory">
        <p class="alert alert--red" v-if="!statusResponse">Something went wrong</p>
        <div class="form__fields">
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Tenancy Name</label>
                        <v-text-field
                            v-model="tenancyName"
                            dense
                            outlined
                            :error-messages="tenancyNameErrors"
                        />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Leasing Type</label>
                        <v-select
                            v-model="leasingType"
                            :items="leasingTypes"
                            item-text="text"
                            item-value="value"
                            placeholder="Please select"
                            dense
                            outlined
                            :error-messages="leasingTypeErrors"
                        />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>ID / Passport No.</label>
                        <v-text-field
                            v-model="passportNo"
                            dense
                            outlined
                            :error-messages="passportNoErrors"
                        />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6" v-if="leasingType.name === 'Corporate'">
                    <div class="form__field">
                        <label>Company Name</label>
                        <v-text-field
                            v-model="companyName"
                            dense
                            outlined
                            :error-messages="companyNameErrors"
                        />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                    <div class="form__field">
                        <label>Remarks</label>
                        <v-textarea v-model="remark" dense outlined />
                    </div>
                </v-col>
            </v-row>
        </div>
        <div class="form__actions">
            <v-btn class="btn btn--ghost btn--gray btn--sm" @click="onClose">Cancel</v-btn>
            <v-btn class="btn btn--primary btn--green btn--sm" @click="onSubmit" :loading="loading">
                {{ isUpdated ? "Update" : "Create" }}
            </v-btn>
        </div>
    </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required, requiredIf } from "vuelidate/lib/validators"
import qs from "qs"
import { mapState } from "vuex"
import { setFormControlErrors } from "~/ultilities/form-validations"

export default {
    name: "AddTenancyInfoForm",
    mixins: [validationMixin],
    validations: {
        tenancyName: { required },
        leasingType: { required },
        passportNo: { required },
        companyName: {
            required: requiredIf(function () {
                if (this.isUpdated) {
                    return this.leasingType !== null && this.leasingType.name === "Corporate"
                } else {
                    return this.leasingType.name === "Corporate"
                }
            })
        }
    },
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        ...mapState({
            tenancyDetails: (state) => state.tenancy.tenancyDetails,
            statusResponse: (state) => state.tenancy.statusResponse
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
        },
        isUpdated() {
            return this.source !== null
        }
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
            loading: false
        }
    },
    created() {
        if (this.isUpdated) {
            this.tenancyName = this.source.tenancyName
            this.leasingType = this.leasingTypes.find(
                (type) => type.value.id === this.source.leasingTypeFID
            )
                ? this.leasingTypes.find((type) => type.value.id === this.source.leasingTypeFID)
                      .value
                : null
            this.passportNo = this.source.tenancyIdentityDocNo
                ? this.source.tenancyIdentityDocNo
                : ""
            this.companyName = this.source.companyName
            this.remark = this.source.remark
        }
    },
    methods: {
        onClose() {
            this.$emit("close")
        },
        onResetForm() {
            this.$v.$reset()
            this.tenancyName = ""
            this.leasingType = ""
            this.passportNo = ""
            this.companyName = ""
            this.remark = ""
        },
        async onUpdate() {
            const params = {
                id: this.source.id,
                tenancyContractAgreementFID: this.tenancyDetails.id,
                tenancyName: this.tenancyName,
                tenancyIdentityDocNo: this.passportNo,
                leasingTypeFID: this.leasingType.id,
                leasingTypeDisplay: this.leasingType.name,
                companyName: this.leasingType.name === "Corporate" ? this.companyName : "",
                remark: this.remark
            }
            await this.$store
                .dispatch("tenancy/updateTenancyInfo", params)
                .then(() => {
                    const paramAgreementFID = qs.stringify({
                        TenancyContractAgreementFID: this.tenancyDetails.id
                    })
                    this.$store.dispatch("tenancy/getTenancyInfosById", paramAgreementFID)
                })
                .then(() => {
                    this.loading = false
                    this.onResetForm()

                    if (this.statusResponse) {
                        this.onClose()
                    }
                })
        },

        onCreateTenancyInfo() {
            const params = {
                tenancyContractAgreementFID: this.tenancyDetails.id,
                tenancyName: this.tenancyName,
                tenancyIdentityDocNo: this.passportNo,
                leasingTypeFID: this.leasingType.id,
                leasingTypeDisplay: this.leasingType.name,
                companyName: this.leasingType.name === "Corporate" ? this.companyName : "",
                remark: this.remark
            }
            this.$store
                .dispatch("tenancy/createTenancyTenantInfos", params)
                .then(() => {
                    const paramAgreementFID = qs.stringify({
                        TenancyContractAgreementFID: this.tenancyDetails.id
                    })
                    this.$store.dispatch("tenancy/getTenancyInfosById", paramAgreementFID)
                })
                .then(() => {
                    this.loading = false
                    this.onResetForm()

                    if (this.statusResponse) {
                        this.onClose()
                    }
                })
        },
        async onSubmit() {
            this.loading = true
            await this.$v.$touch()
            if (!this.$v.$invalid) {
                if (this.isUpdated) {
                    await this.onUpdate()
                } else {
                    await this.onCreateTenancyInfo()
                }
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

.form__field {
    margin-bottom: -1.2rem;

    &::v-deep(.v-text-field__details) {
        padding-left: 0;

        .v-messages__message {
            font-size: 1.3rem;
            line-height: 1.2em;
        }
    }
}
</style>
