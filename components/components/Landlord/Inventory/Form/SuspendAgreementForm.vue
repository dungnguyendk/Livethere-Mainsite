<template lang="html">
    <form class="form form--create-tenancy-agreement" @submit.prevent="submitForm">
        <p class="alert alert--red mb-10" v-if="isShowErrorMessage">{{ errorMessages }}</p>
        <template v-if="submitted">
            <div class="form__fields">
                <v-row>
                    <v-col cols="12" sm="12" md="6">
                        <div class="form__field">
                            <label class="required">End Date </label>
                            <v-menu
                                ref="endDateMenu"
                                v-model="endDateMenu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="endDate"
                                        :error-messages="endDateErrors"
                                        prepend-inner-icon="mdi-calendar"
                                        v-bind="attrs"
                                        v-on="on"
                                        outlined
                                        dense
                                    />
                                </template>
                                <v-date-picker
                                    v-model="endDateRaw"
                                    no-title
                                    @input="endDateMenu = false"
                                />
                            </v-menu>
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
                <v-btn class="btn btn--primary btn--red btn--sm" type="submit"> Suspend</v-btn>
            </div>
        </template>

        <template v-else> </template>
    </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"
import { setFormControlErrors } from "~/ultilities/form-validations"
import { mapState } from "vuex"

export default {
    name: "SuspendAgreementForm",
    mixins: [validationMixin],
    validations: {
        endDate: {
            required
        }
    },
    computed: {
        ...mapState({
            inventoryDetails: (state) => state.inventory.inventoryDetails
        }),
        endDateErrors() {
            return setFormControlErrors(this.$v.endDate, "This field is required")
        }
    },
    data() {
        return {
            endDate: "",
            endDateMenu: "",
            endDateRaw: "",
            remark: "",
            submitted: true,
            isOpenSnackbar: false,
            isShowErrorMessage: false,
            errorMessages: "",
            confirm: false
        }
    },
    watch: {
        endDateRaw() {
            this.endDate = this.formatDate(this.endDateRaw)
        }
    },

    methods: {
        formatDate(date) {
            if (!date) return null
            return this.$dayjs(date).format("DD-MMM-YYYY")
        },

        async submitForm() {
            this.submitted = true
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const params = {
                    assestInventoryFID: this.inventoryDetails.id,
                    remark: this.remark
                }
                this.isShowErrorMessage = false
                this.errorMessages = ""
                this.$store.dispatch("inventory/createTenancyAgreement", params).then((value) => {
                    if (value) {
                        if (value.id !== 0) {
                            this.$emit("openSnackbar", (this.isOpenSnackbar = true))
                            this.resetForm()
                            this.onClose()
                        } else {
                            this.isShowErrorMessage = true
                            this.errorMessages = value.responseMessage
                        }
                    } else {
                        this.isShowErrorMessage = true
                        this.errorMessages = value.responseMessage
                    }
                })
            } else {
                console.error("error!")
            }
        },
        onClose() {
            this.$emit("close")
            this.resetForm()
        },
        resetForm() {
            this.$v.$reset()
            this.endDateRaw = ""
            this.remark = ""
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
        padding-top: 2.4rem;
        padding-bottom: 1.2rem;

        .btn {
            min-width: 12rem;
        }
    }

    .form__fields {
        &::v-deep(.row) {
            > * {
                padding-top: 0 !important;
                padding-bottom: 0 !important;
            }
        }
    }
}

.radio--custom {
    &::v-deep(label) {
        margin-bottom: 0 !important;
        font-size: 1.4rem;
    }
}

.radio-group--optionDate {
    &::v-deep {
        margin-top: 0 !important;
        padding-bottom: 2.4rem;
    }
}
</style>
