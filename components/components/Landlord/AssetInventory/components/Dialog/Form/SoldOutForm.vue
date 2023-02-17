<template>
    <form @submit.prevent="onFormSubmit" class="form--add-new-inventory">
        <div class="form__top">
            <h3>{{ source?.propertyName? source.propertyName : "SOLD OUT" }}</h3>
        </div>
        <p class="alert alert--red" v-if="!statusResponse">Something went wrong</p>
        <div class="form__field">
            <label>Sold Date</label>
            <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y
                min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="soldDateFormatted" :error-messages="soldDateFormattedErrors" outlined
                        dense persistent-hint readonly prepend-inner-icon="mdi-calendar" v-bind="attrs"
                        @blur="soldOutDate = parseDate(soldOutDate)" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="soldOutDate" no-title @input="menu1 = false"></v-date-picker>
            </v-menu>
        </div>
        <div class="form__field">
            <label>Remarks</label>
            <v-textarea v-model.trim="soldRemark" outlined dense />
        </div>
        <div class="card__footer">
            <div class="btn-group">
                <v-btn class="btn btn--primary btn--green btn__add-file" @click="handleClickProcess">
                    Process</v-btn>
                <span class="cancel-form" @click="onClose()"> Cancel </span>
            </div>
        </div>
        <ConfirmDialog :open="confirmDialog" size="large" type="full" @close="confirmDialog = false" :loading="loading"
            @onSubmit="putSold" />
    </form>
</template>
<script>
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"
import { setFormControlErrors } from "~/ultilities/form-validations"
import { mapState } from "vuex"
import ConfirmDialog from "~/components/elements/Dialog/ConfirmDialog.vue"
import qs from "qs"
export default {
    name: "SoldOutForm",
    components: { ConfirmDialog },
    mixins: [validationMixin],
    validations: {
        soldDateFormatted: { required }
    },
    props: {
        source: {
            type: Object,
            default: () => null
        },
        sourceDetail: {
            type: Number,
            default: () => null
        }
    },
    data() {
        return {
            soldRemark: "",
            soldOutDate: "",
            soldDateFormatted: "",
            menu1: false,
            loading: false,
            confirmDialog: false
        }
    },
    computed: {
        ...mapState({
            statusResponse: (state) => state.inventories.statusResponse,
            statusFID: (state) => state.inventories.typeSelect
        }),
        soldDateFormattedErrors() {
            return setFormControlErrors(this.$v.soldDateFormatted, "Sold Date is required")
        },
    },
    created() {
        // console.log("sourceDetail::", this.source.propertyName);
    },
    methods: {
        onFormSubmit() {
            this.loading = true
        },
        handleClickProcess() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.confirmDialog = true
            }
            else {
                this.confirmDialog = false
                this.loading = false
            }
        },
        putSold() {
            this.onFormSubmit()
            const params = {
                id: this.sourceDetail,
                soldRemark: this.soldRemark,
                soldOutDate: this.soldOutDate ? this.soldOutDate : ''
            }
            this.$store.dispatch("inventories/putSold", params).then(() => {
                const paramStatusFID = qs.stringify({
                    StatusFID: this.statusFID
                })
                this.$store.dispatch("inventories/getInventories", paramStatusFID)
            }).then(() => {
                this.loading = false
                if (this.statusResponse) {
                    this.onClose()
                }
            })
        },

        onClose() {
            this.$emit("close")
        },
        formatDate(date) {
            if (!date) return null

            return this.$moment(date).format("DD-MMM-YYYY")
        },
        parseDate(date) {
            if (!date) return null

            return this.$moment(date).format("YYYY-MM-DD")
        },
    },
    watch: {
        soldOutDate() {
            this.soldDateFormatted = this.formatDate(this.soldOutDate)
        },
    }
}
</script>
<style lang="scss" scoped>
.form__fields {
    padding: 3.2rem 2rem 1rem 2rem;
    display: grid;
    column-gap: 2.4rem;
    grid-template-columns: repeat(2, 1fr);
}

.form__field {
    width: 100%;

    label {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2rem;
        color: var(--color-label);
        margin-bottom: 0.8rem;
    }
}

.form__field2 {
    display: flex;
    column-gap: 2.4rem;
    grid-template-columns: repeat(2, 1fr);

    label {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2rem;
        color: var(--color-label);
        margin-bottom: 0.8rem;
    }
}

@media only screen and (max-width: 768px) {
    .form__fields {
        padding: 3.2rem 2rem 1rem 2rem;
        display: grid;
        column-gap: 2.4rem;
        grid-template-columns: repeat(1, 1fr);
    }
}

.btn-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 2.6rem;

    .btn {
        max-width: 12rem;
        border-radius: 0.8rem !important;
    }

    .btn__add-file {
        min-width: 38rem !important;
    }

    .cancel-form {
        color: var(--color-menu);
        text-decoration-line: underline;
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2rem;
        cursor: pointer;
    }

    .btn--green {
        &.v-btn--has-bg.v-btn--disabled {
            cursor: not-allowed;
        }
    }
}

.form__top {
    margin-bottom: 1rem;
    text-align: center;

    h3 {
        margin-bottom: 0;
        font-weight: 700;
        font-size: 2.4rem;
        line-height: 2.8rem;
        color: var(--color-title-black);
    }
}

.v-btn--disabled {
    pointer-events: auto;
}

@media only screen and (max-width: 768px) {
    .btn-group {
        .btn__add-file {
            min-width: auto !important;
            width: 100%;
            max-width: 100% !important;
        }
    }
}

.card__footer {
    padding: 0 5rem 5rem 5rem;

    @media only screen and (max-width: 768px) {
        padding: 0 3rem 3rem 3rem;
    }
}
</style>
