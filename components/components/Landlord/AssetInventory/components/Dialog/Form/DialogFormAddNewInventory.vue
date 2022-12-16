<template>
    <v-form v-model="valid" class="section__form">
        <div class="form--input">
            <p>Property Type</p>
            <v-text-field v-model.trim="propertyType" outlined dense placeholder="Type here" required
                :error-messages="propertyTypeErrors" @input="$v.propertyType.$touch()"
                @blur="$v.propertyType.$touch()" />
        </div>
        <div class="form--input2">
            <div class="form--input">
                <p>Postal Code</p>
                <v-text-field v-model.trim="postalCode" outlined dense placeholder="Type here" required
                    :error-messages="postalCodeErrors" @input="$v.postalCode.$touch()" @blur="$v.postalCode.$touch()" />
            </div>
            <div class="form--input">
                <p>House No.</p>
                <v-text-field v-model.trim="houseNo" outlined dense placeholder="Type here" required
                    :error-messages="houseNoErrors" @input="$v.houseNo.$touch()" @blur="$v.houseNo.$touch()" />
            </div>
        </div>
        <div class="form--input">
            <p>Street Name</p>
            <v-text-field v-model.trim="streetName" outlined dense placeholder="Type here" required
                :error-messages="streetNameErrors" @input="$v.streetName.$touch()" @blur="$v.streetName.$touch()" />
        </div>
        <div class="form--input">
            <p>Unit No.</p>
            <v-text-field v-model.trim="unitNo" outlined dense placeholder="Type here" required
                :error-messages="unitNoErrors" @input="$v.unitNo.$touch()" @blur="$v.unitNo.$touch()" />
        </div>
        <div class="form--input">
            <p>Project Name</p>
            <v-text-field v-model.trim="projectName" outlined dense placeholder="Type here" required
                :error-messages="projectNameErrors" @input="$v.projectName.$touch()" @blur="$v.projectName.$touch()" />
        </div>
        <div class="form--input2">
            <div class="form--input">
                <p>No of Bedroom(s)</p>
                <v-text-field v-model.trim="bedroom" outlined dense placeholder="Type here" required
                    :error-messages="bedroomErrors" @input="$v.bedroom.$touch()" @blur="$v.bedroom.$touch()" />
            </div>
            <div class="form--input">
                <p>Tenure</p>
                <v-text-field v-model.trim="tenure" outlined dense placeholder="Type here" required
                    :error-messages="tenureErrors" @input="$v.tenure.$touch()" @blur="$v.tenure.$touch()" />
            </div>
        </div>
        <div class="form--input">
            <p>Floor Area (sqft)</p>
            <v-text-field v-model.trim="floorArea" outlined dense placeholder="Type here" required
                :error-messages="floorAreaErrors" @input="$v.floorArea.$touch()" @blur="$v.floorArea.$touch()" />
        </div>
        <div class="form--input">
            <p>Land Area (sqft)</p>
            <v-text-field v-model.trim="landArea" outlined dense placeholder="Type here" required
                :error-messages="landAreaErrors" @input="$v.landArea.$touch()" @blur="$v.landArea.$touch()" />
        </div>
    </v-form>
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
            this.$v.$touch()
            if (!this.$v.propertyType.$dirty) return errors;
            !this.$v.propertyType.required && errors.push("Property Type is required");
            return errors;
        },
        postalCodeErrors() {
            const errors = [];
            this.$v.$touch()
            if (!this.$v.postalCode.$dirty) return errors;
            !this.$v.postalCode.required && errors.push("Postal Code is required");
            return errors;
        },
        houseNoErrors() {
            const errors = [];
            this.$v.$touch()
            if (!this.$v.houseNo.$dirty) return errors;
            !this.$v.houseNo.required && errors.push("House No is required");
            return errors;
        },
        streetNameErrors() {
            const errors = [];
            this.$v.$touch()
            if (!this.$v.streetName.$dirty) return errors;
            !this.$v.streetName.required && errors.push("Street Name is required");
            return errors;
        },
        unitNoErrors() {
            const errors = [];
            this.$v.$touch()
            if (!this.$v.unitNo.$dirty) return errors;
            !this.$v.unitNo.required && errors.push("Unit No is required");
            return errors;
        },
        projectNameErrors() {
            const errors = [];
            this.$v.$touch()
            if (!this.$v.projectName.$dirty) return errors;
            !this.$v.projectName.required && errors.push("Project Name is required");
            return errors;
        },
        bedroomErrors() {
            const errors = [];
            this.$v.$touch()
            if (!this.$v.bedroom.$dirty) return errors;
            !this.$v.bedroom.required && errors.push("No of Bedroom(s) is required");
            return errors;
        },
        tenureErrors() {
            const errors = [];
            this.$v.$touch()
            if (!this.$v.tenure.$dirty) return errors;
            !this.$v.tenure.required && errors.push("Tenure is required");
            return errors;
        },
        floorAreaErrors() {
            const errors = [];
            this.$v.$touch()
            if (!this.$v.floorArea.$dirty) return errors;
            !this.$v.floorArea.required && errors.push("Floor Area is required");
            return errors;
        },
        landAreaErrors() {
            const errors = [];
            this.$v.$touch()
            if (!this.$v.landArea.$dirty) return errors;
            !this.$v.landArea.required && errors.push("Land Area is required");
            return errors;
        },
    },
    methods: {
        checkEmptyErrors(val) {
            this.$emit("checkEmptyError", val)
        }
    },
    watch: {
        valid(val) {
            this.checkEmptyErrors(val)
        }
    }
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
    p {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2rem;
        color: #737373;
        margin-bottom: 0.8rem;
    }
}

.form--input2 {
    display: flex;
    column-gap: 2.4rem;
    grid-template-columns: repeat(2, 1fr);

    p {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2rem;
        color: #737373;
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
</style>