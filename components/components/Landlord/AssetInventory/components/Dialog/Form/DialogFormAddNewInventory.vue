<template>
    <form @submit.prevent="submitForm">
        <div class="section__form">
            <div class="form--input">
                <label>Property Type</label>
                <v-text-field v-model.trim="propertyType" outlined dense placeholder="Type here"
                    :error-messages="propertyTypeErrors" @input="$v.propertyType.$touch()"
                    @blur="$v.propertyType.$touch()" />
            </div>
            <div class="form--input2">
                <div class="form--input">
                    <label>Postal Code</label>
                    <v-text-field v-model.trim="postalCode" outlined dense placeholder="Type here"
                        :error-messages="postalCodeErrors" @input="$v.postalCode.$touch()"
                        @blur="$v.postalCode.$touch()" />
                </div>
                <div class="form--input">
                    <label>House No.</label>
                    <v-text-field v-model.trim="houseNo" outlined dense placeholder="Type here"
                        :error-messages="houseNoErrors" @input="$v.houseNo.$touch()" @blur="$v.houseNo.$touch()" />
                </div>
            </div>
            <div class="form--input">
                <label>Street Name</label>
                <v-text-field v-model.trim="streetName" outlined dense placeholder="Type here"
                    :error-messages="streetNameErrors" @input="$v.streetName.$touch()" @blur="$v.streetName.$touch()" />
            </div>
            <div class="form--input">
                <label>Unit No.</label>
                <v-text-field v-model.trim="unitNo" outlined dense placeholder="Type here"
                    :error-messages="unitNoErrors" @input="$v.unitNo.$touch()" @blur="$v.unitNo.$touch()" />
            </div>
            <div class="form--input">
                <label>Project Name</label>
                <v-text-field v-model.trim="projectName" outlined dense placeholder="Type here"
                    :error-messages="projectNameErrors" @input="$v.projectName.$touch()"
                    @blur="$v.projectName.$touch()" />
            </div>
            <div class="form--input2">
                <div class="form--input">
                    <label>No of Bedroom(s)</label>
                    <v-text-field v-model.trim="bedroom" outlined dense placeholder="Type here"
                        :error-messages="bedroomErrors" @input="$v.bedroom.$touch()" @blur="$v.bedroom.$touch()" />
                </div>
                <div class="form--input">
                    <label>Tenure</label>
                    <v-text-field v-model.trim="tenure" outlined dense placeholder="Type here"
                        :error-messages="tenureErrors" @input="$v.tenure.$touch()" @blur="$v.tenure.$touch()" />
                </div>
            </div>
            <div class="form--input">
                <label>Floor Area (sqft)</label>
                <v-text-field v-model.trim="floorArea" outlined dense placeholder="Type here"
                    :error-messages="floorAreaErrors" @input="$v.floorArea.$touch()" @blur="$v.floorArea.$touch()" />
            </div>
            <div class="form--input">
                <label>Land Area (sqft)</label>
                <v-text-field v-model.trim="landArea" outlined dense placeholder="Type here"
                    :error-messages="landAreaErrors" @input="$v.landArea.$touch()" @blur="$v.landArea.$touch()" />
            </div>
        </div>
        <div class="card__footer">
            <div class="btn-group">
                <v-btn class="btn btn--primary btn--green btn__add-file" type="submit">
                    Add
                </v-btn>
                <span class="cancel-form" @click="onClose()">
                    Cancel
                </span>
            </div>
        </div>
    </form>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
    name: "DialogFormAddNewInventory",
    mixins: [validationMixin],
    validations: {
        propertyType: { required },
        postalCode: { required },
        houseNo: { required },
        streetName: { required },
        unitNo: { required },
        projectName: { required },
        bedroom: { required },
        tenure: { required },
        floorArea: { required },
        landArea: { required }
    },
    data() {
        return {
            valid: false,
            propertyType: '',
            postalCode: '',
            houseNo: '',
            streetName: '',
            unitNo: '',
            projectName: '',
            bedroom: '',
            tenure: '',
            floorArea: '',
            landArea: ''
        }
    },
    computed: {
        propertyTypeErrors() {
            const errors = [];
            if (!this.$v.propertyType.$dirty) return errors;
            !this.$v.propertyType.required && errors.push("Property Type is required");
            return errors;
        },
        postalCodeErrors() {
            const errors = [];
            if (!this.$v.postalCode.$dirty) return errors;
            !this.$v.postalCode.required && errors.push("Postal Code is required");
            return errors;
        },
        houseNoErrors() {
            const errors = [];
            if (!this.$v.houseNo.$dirty) return errors;
            !this.$v.houseNo.required && errors.push("House No is required");
            return errors;
        },
        streetNameErrors() {
            const errors = [];
            if (!this.$v.streetName.$dirty) return errors;
            !this.$v.streetName.required && errors.push("Street Name is required");
            return errors;
        },
        unitNoErrors() {
            const errors = [];
            if (!this.$v.unitNo.$dirty) return errors;
            !this.$v.unitNo.required && errors.push("Unit No is required");
            return errors;
        },
        projectNameErrors() {
            const errors = [];
            if (!this.$v.projectName.$dirty) return errors;
            !this.$v.projectName.required && errors.push("Project Name is required");
            return errors;
        },
        bedroomErrors() {
            const errors = [];
            if (!this.$v.bedroom.$dirty) return errors;
            !this.$v.bedroom.required && errors.push("No of Bedroom(s) is required");
            return errors;
        },
        tenureErrors() {
            const errors = [];
            if (!this.$v.tenure.$dirty) return errors;
            !this.$v.tenure.required && errors.push("Tenure is required");
            return errors;
        },
        floorAreaErrors() {
            const errors = [];
            if (!this.$v.floorArea.$dirty) return errors;
            !this.$v.floorArea.required && errors.push("Floor Area is required");
            return errors;
        },
        landAreaErrors() {
            const errors = [];
            if (!this.$v.landArea.$dirty) return errors;
            !this.$v.landArea.required && errors.push("Land Area is required");
            return errors;
        },
    },
    methods: {
        checkEmptyErrors(val) {
            this.$emit("checkEmptyError", val)
        },
        submitForm() {
            console.log('submit!', this.$v.$invalid)
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.onClose()
            }
        },
        onClose() {
            this.$emit("close")
        }
    },
    // watch: {
    //     valid(val) {
    //         this.checkEmptyErrors(val)
    //     }
    // }
}
</script>
<style lang="scss" scoped>
.section__form {
    padding: 3.2rem 5rem 1rem 5rem;
    display: grid;
    column-gap: 2.4rem;
    grid-template-columns: repeat(2, 1fr);
}

.form--input {
    label {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2rem;
        color: var(--color-label);
        margin-bottom: 0.8rem;
    }
}

.form--input2 {
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
    .section__form {
        padding: 3.2rem 3rem 1rem 3rem;
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