<template lang="html">
    <form class="form--filter-projects" @submit.prevent="onSubmitForm">
        <div class="form__fields">
            <div class="form__field mb-custom-1">
                <label>Location</label>
                <v-text-field
                    outlined
                    dense
                    prepend-inner-icon="icon-svg svg-location"
                    placeholder="Where do you want to live?"
                    v-model="location"
                >
                </v-text-field>
            </div>
            <div class="form__field mb-custom-2">
                <label>Property Type</label>
                <v-select
                    v-model="propertyType"
                    :items="propertyTypeList"
                    item-text="text"
                    item-value="value.name"
                    outlined
                    dense
                    prepend-inner-icon="icon-svg svg-buildings"
                    append-icon="mdi-chevron-down"
                    class="form__field-select-custom"
                    placeholder="All"
                >
                </v-select>
            </div>
            <div class="form__field3 mb-custom-1">
                <div class="form__field">
                    <v-checkbox
                        on-icon="ri-checkbox-circle-fill"
                        off-icon="ri-checkbox-blank-circle-line"
                        label="circle"
                        color="#EDB842"
                        hide-details
                        class="form__field-checkbox-custom"
                        v-model="selectAll"
                        @change="select_All($event)"
                    >
                        <template v-slot:label>
                            <div class="form__field-label-custom">
                                <span>All</span>
                            </div>
                        </template>
                    </v-checkbox>
                </div>
                <div class="form__field">
                    <v-checkbox
                        on-icon="ri-checkbox-circle-fill"
                        off-icon="ri-checkbox-blank-circle-line"
                        label="circle"
                        color="#EDB842"
                        hide-details
                        class="form__field-checkbox-custom"
                        v-model="selectedLivethere"
                        @change="select_Livethere($event)"
                    >
                        <template v-slot:label>
                            <div class="form__field-label-custom">
                                <span>Livethere Premium</span>
                                <img :src="require(`~/static/img/logos/logo-project.svg`)" alt="" />
                            </div>
                        </template>
                    </v-checkbox>
                </div>
            </div>
            <div class="form__field2 mb-custom-1">
                <div class="form__field">
                    <label>Bedrooms</label>
                    <v-select
                        v-model="bedroom"
                        :items="bedroomList"
                        item-text="text"
                        item-value="value.name"
                        placeholder="Select"
                        outlined
                        dense
                        attach
                        prepend-inner-icon="icon-svg svg-bedroom"
                        append-icon="mdi-chevron-down"
                        class="form__field-select-custom"
                    >
                    </v-select>
                </div>
                <div class="form__field">
                    <label>Bathrooms</label>
                    <v-select
                        v-model="bathroom"
                        dense
                        outlined
                        prepend-inner-icon="icon-svg svg-bathroom"
                        append-icon="mdi-chevron-down"
                        class="form__field-select-custom"
                        placeholder="Select"
                        :items="bathroomList"
                        item-text="text"
                        item-value="value.name"
                    >
                    </v-select>
                </div>
            </div>
            <div class="form__field mb-custom-1">
                <label>Rent per Month (S$)</label>
                <v-range-slider
                    thumb-color="#f7f7f9"
                    track-fill-color="#EDB842"
                    track-color="#E5E5E5"
                    class="form__field-range-custom"
                    v-model="rangeRentPer"
                    :min="minRentPer"
                    :max="maxRentPer"
                    step="500"
                >
                    <template v-slot:prepend>
                        <v-text-field
                            :value="rangeRentPerMin"
                            hide-details
                            dense
                            prefix="$"
                            flat
                            solo
                            class="form__field-text-field-custom"
                            style="width: 65px"
                            readonly
                            @change="$set(rangeRentPer, 0, $event)"
                        >
                        </v-text-field>
                    </template>
                    <template v-slot:append>
                        <v-text-field
                            :value="rangeRentPerMax"
                            hide-details
                            dense
                            prefix="$"
                            flat
                            solo
                            class="form__field-text-field-custom"
                            style="width: 65px"
                            readonly
                            @change="$set(rangeRentPer, 1, $event)"
                        >
                        </v-text-field>
                    </template>
                </v-range-slider>
            </div>
            <div class="form__field mb-custom-3">
                <label>Unit Size (sq.ft)</label>
                <v-range-slider
                    thumb-color="#f7f7f9"
                    track-fill-color="#EDB842"
                    track-color="#E5E5E5"
                    class="form__field-range-custom"
                    v-model="rangeUnitSize"
                    :min="minUnitSize"
                    :max="maxUnitSize"
                    step="500"
                >
                    <template v-slot:prepend>
                        <v-text-field
                            :value="rangeUnitSizeMin"
                            hide-details
                            dense
                            flat
                            solo
                            class="form__field-text-field-custom"
                            style="width: 65px"
                            readonly
                        >
                        </v-text-field>
                    </template>
                    <template v-slot:append>
                        <v-text-field
                            :value="rangeUnitSizeMax"
                            hide-details
                            dense
                            flat
                            solo
                            class="form__field-text-field-custom"
                            style="width: 65px"
                        >
                        </v-text-field>
                    </template>
                </v-range-slider>
            </div>
            <div class="form__field">
                <label>Amenities</label>
                <v-chip-group multiple column active-class="primary--text"  v-model="selected">
                    <v-chip  
                     v-for="(amenities, index) in listAmenities"
                     :key="index"
                      label
                      class="ma-1 form__field-tag-custom"
                      :value="amenities.id"
                    >
                        <i :class="amenities.icon"></i>
                        <span>{{ amenities.title }}</span>
                    </v-chip>
                </v-chip-group>
            </div>
        </div>
        <div class="form__footer">
            <div class="form__btn">
                <v-btn class="btn btn--ghost btn--red" @click="onResetForm">Reset</v-btn>
                <v-btn class="btn btn--primary btn--green" type="submit">Apply</v-btn>
            </div>
        </div>
    </form>
</template>

<script>
import { PROPERTY_TYPE, BEDROOM_TYPE, BATHROOM_TYPE } from "~/ultilities/contants/asset-inventory"
import { convertNumberToCommas, convertCommasToNumber } from "~/ultilities/helpers"
export default {
    name: "FilterProjectForm",
    data() {
        return {
            listAmenities: [
                {
                    id: 1,
                    title: "BBQ",
                    icon: "icon-svg svg-bbq"
                },
                {
                    id: 2,
                    title: "Playground",
                    icon: "icon-svg svg-playground"
                },
                {
                    id: 3,
                    title: "Pool",
                    icon: "icon-svg svg-pool"
                },
                {
                    id: 4,
                    title: "Clubhouse",
                    icon: "icon-svg svg-club-house"
                },
                {
                    id: 5,
                    title: "Gym",
                    icon: "icon-svg svg-gym"
                },
                {
                    id: 6,
                    title: "Concierge",
                    icon: "icon-svg svg-concierge"
                },
                {
                    id: 7,
                    title: "Tennis Court",
                    icon: "icon-svg svg-tennis-court"
                },
                {
                    id: 8,
                    title: "Function Room",
                    icon: "icon-svg svg-function-room"
                }
            ],
            propertyTypeList: PROPERTY_TYPE,
            bedroomList: BEDROOM_TYPE,
            bathroomList: BATHROOM_TYPE,
            location: "",
            propertyType: "",
            selectAll: false,
            selectedLivethere: true,
            bedroom: "",
            bathroom: "",
            selected: [],
            rangeRentPer: [8000, 15000],
            minRentPer: 1000,
            maxRentPer: 20000,
            rangeUnitSize: [4000, 10000],
            minUnitSize: 100,
            maxUnitSize: 10000,
            submitted: false
        }
    },
    computed: {
        rangeRentPerMin() {
            return this.rangeRentPer[0] ? convertNumberToCommas(this.rangeRentPer[0]) : "0"
        },
        rangeRentPerMax() {
            return this.rangeRentPer[this.rangeRentPer.length - 1] === this.maxRentPer
                ? convertNumberToCommas(this.rangeRentPer[this.rangeRentPer.length - 1]) + "+"
                : convertNumberToCommas(this.rangeRentPer[this.rangeRentPer.length - 1])
        },
        rangeUnitSizeMin() {
            return this.rangeUnitSize[0] ? convertNumberToCommas(this.rangeUnitSize[0]) : "0"
        },
        rangeUnitSizeMax() {
            return this.rangeUnitSize[this.rangeUnitSize.length - 1] === this.maxUnitSize
                ? convertNumberToCommas(this.rangeUnitSize[this.rangeUnitSize.length - 1]) + "+"
                : convertNumberToCommas(this.rangeUnitSize[this.rangeUnitSize.length - 1])
        }
    },
    methods: {
        onClose() {
            this.$emit("close")
        },
        select_All(e) {
            if (e == true && this.selectedLivethere === false) {
                this.selectedLivethere = true
            }
        },
        select_Livethere(e) {
            if (e == false && this.selectAll === true) {
                this.selectAll = false
            }
        },
        onSubmitForm() {
            this.submitted = true
            const params = {
                location: this.location,
                propertyType: this.propertyType,
                selectAll: this.selectAll,
                selectedLivethere: this.selectedLivethere,
                bedroom: this.bedroom,
                bathroom: this.bathroom,
                rangeRentPer: this.rangeRentPer,
                rangeUnitSize: this.rangeUnitSize,
                selected: this.selected
            }
            console.log("params: ", params)
            this.onClose()
        },
        onResetForm() {
            ;(this.location = ""),
                (this.propertyType = ""),
                (this.selectAll = false),
                (this.selectedLivethere = false),
                (this.bedroom = ""),
                (this.bathroom = ""),
                (this.rangeRentPer = [8000, 15000]),
                (this.rangeUnitSize = [4000, 10000]),
                (this.selected = [])
        },

    }
}
</script>
<style lang="scss" scoped>
.form--filter-projects {
    background-color: var(--color-white);
    ::v-deep(.v-input__slot) {
        padding: 0 !important;

        input {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-label);
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        input[type="number"] {
            -moz-appearance: textfield;
        }
        .v-text-field__prefix {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-label);
        }
    }
}
.form__footer {
    padding: 2.4rem 5rem 3.3rem;
    .form__border-top {
        margin-bottom: 3rem;
        width: 100%;
        height: 0.1rem;
        background-color: var(--border-color);
    }
    .form__btn {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        button {
            &:last-child {
                margin-left: 1rem;
            }
        }
    }
}
.form__fields {
    padding: 0 5rem 3.2rem;
    border-bottom: 0.1rem solid var(--border-color);
    max-height: calc(90vh - 190px);
    overflow: auto;
    /* width */

    .form__field {
        label {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2rem;
            color: var(--color-label);
            margin-bottom: 0.8rem;
        }
    }
    .form__field2 {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-gap: 2.4rem;
    }
    .form__field3 {
        display: flex;
        align-items: center;
        .form__field {
            &:first-child {
                margin-right: 7rem;
            }
        }
    }
}
.form__field-select-custom {
    ::v-deep(.v-select__slot) {
        .v-label--active {
            left: -3.6rem !important;
        }
        label {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2rem;
            color: var(--color-title-black);
        }
        .v-select__selection--comma {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2rem;
            color: var(--color-title-black);
        }
    }
}
.v-text-field {
    ::v-deep(.v-input__control) {
        .v-text-field__details {
            display: none;
        }
        .v-input__slot {
            padding: 0 !important;
            .v-input__prepend-inner {
                margin-right: 0.5rem;
                margin-left: 1.6rem;
            }
        }

        .v-text-field__slot {
            input::placeholder {
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2rem;
                color: var(--color-title-black);
                padding-top: 1rem;
            }
            input {
                margin-right: -2rem;
            }
        }
    }
}
.v-input--selection-controls {
    margin-top: 0;
}
.form__field-text-field-custom {
    ::v-deep(.v-input__control) {
        .v-input__slot {
            background-color: transparent !important;
        }
    }
}
.form__field-label-custom {
    span {
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: #000000;
    }
    img {
        width: 3.4rem;
        height: 3.4rem;
        margin-left: 0.2rem;
    }
}
.form__field-checkbox-custom {
    margin-right: 0.6rem;
    input {
        border-radius: 50%;
    }
}
.form__field-range-custom {
    display: block;
    position: relative;
    ::v-deep(.v-input__slot) {
        top: -0.7rem;

        .v-slider__track-container {
            height: 0.4rem;
        }
    }
    ::v-deep(.v-slider__thumb) {
        background-color: var(--color-white);
        width: 2rem;
        height: 2rem;
        border: 0.1rem solid var(--border-color);
        box-shadow: 0px 2px 5px rgba(60, 66, 87, 0.08), 0px 1px 1px rgba(0, 0, 0, 0.12);
    }
    ::v-deep(.v-input__prepend-outer) {
        position: absolute;
        top: 2rem;
        left: 0;
        margin-left: 0;
        margin-bottom: 0;
        p {
            margin-bottom: 0;
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-label);
        }
    }
    ::v-deep(.v-input__append-outer) {
        position: absolute;
        right: 0;
        top: 2rem;
        margin-left: 0;
        margin-bottom: 0;
        p {
            margin-bottom: 0;
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-label);
        }
    }
}

.form__field-tag-custom {
    span {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--color-title-black);
        margin-left: 0.8rem;
    }
    i {
        width: 1.6rem;
    }
}
.mb-custom-1 {
    margin-bottom: 3rem;
}
.mb-custom-2 {
    margin-bottom: 1.9rem;
}
.mb-custom-3 {
    margin-bottom: 4.2rem;
}
::-webkit-scrollbar {
    width: 0.5rem;
}

::-webkit-scrollbar-track {
    border-radius: 1rem;
}

::-webkit-scrollbar-thumb {
    background: #bfbfbf;
    border-radius: 1rem;
}
::-webkit-scrollbar-thumb:hover {
    background: #a2a0a0;
}
</style>
