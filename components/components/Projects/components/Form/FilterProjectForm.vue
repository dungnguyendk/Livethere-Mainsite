<template lang="html">
    <form class="form--filter-projects">
        <div class="form__top">
            <h3>Filter</h3>
        </div>
        <div class="form__fields">
            <div class="form__field">
                <label>Location</label>
                <v-text-field
                    outlined
                    dense
                    prepend-inner-icon="icon-svg svg-location"
                    placeholder="Where do you want to live?">
                </v-text-field>
            </div>
            <div class="form__field">
                <label>Property Type</label>
                <v-select
                    v-model="propertyType"
                    outlined
                    dense
                    prepend-inner-icon="icon-svg svg-buildings"
                    append-icon="mdi-chevron-down">
                </v-select>
            </div>
            <div class="form__field3">
                <div class="form__field">
                    <v-checkbox
                        color="#EDB842"
                        hide-details
                        class="form__field-checkbox-custom">
                        <template v-slot:label>
                            <div class="form__field-label-custom">
                                <span>All</span>
                            </div>
                        </template>
                    </v-checkbox>
                </div>
                <div class="form__field">
                    <v-checkbox
                        color="#EDB842"
                        hide-details
                        class="form__field-checkbox-custom">
                        <template v-slot:label>
    <div class="form__field-label-custom">
        <span>Livethere Premium</span>
        <img :src="require(`~/static/img/logos/logo-project.svg`)" alt="" />
    </div>
</template>
                    </v-checkbox>
                </div>
            </div>
            <div class="form__field2">
                <div class="form__field">
                    <label>Bedrooms</label>
                    <v-select
                        v-model="bedrooms"
                        outlined
                        dense
                        prepend-inner-icon="icon-svg svg-bedroom"
                        append-icon="mdi-chevron-down">
                    </v-select>
                </div>
                <div class="form__field">
                    <label>Bathrooms</label>
                    <v-select
                        v-model="bathrooms"
                        dense
                        outlined
                        prepend-inner-icon="icon-svg svg-bathroom"
                        append-icon="mdi-chevron-down">
                    </v-select>
                </div>
            </div>
            <div class="form__field">
                <label>Rent per Month (S$)</label>
                <v-range-slider
                    thumb-color="#f7f7f9"
                    track-fill-color="#EDB842"
                    track-color="#E5E5E5"
                    class="form__field-range-custom">
                    <template v-slot:prepend>
                        <p>$4,000</p>
                    </template>
                    <template v-slot:append>
                        <p>$15,000</p>
                    </template>
                </v-range-slider>
            </div>
            <div class="form__field">
                <label>Unit Size (sq.ft)</label>
                <v-range-slider
                    thumb-color="#f7f7f9"
                    track-fill-color="#EDB842"
                    track-color="#E5E5E5"
                    class="form__field-range-custom">
                    <template v-slot:prepend>
                        <p>100</p>
                    </template>
                    <template v-slot:append>
                        <p>10,000+</p>
                    </template>
                </v-range-slider>
            </div>
            <div class="form__field">
                <label>Amenities</label>
                <v-item-group multiple>
                    <v-item
                        v-for="(amenities, index) in listAmenities"
                        :key="index"
                        v-slot="{active, toggle}">
                        <v-chip
                            label
                            color="#ffffff66"
                            class="ma-1 form__field-tag-custom"
                            @click="toggle">
                            <i :class="amenities.icon"></i>
                            <span>{{ amenities.title }}</span>
                        </v-chip>
                    </v-item>
                </v-item-group>
            </div>
        </div>
        <div class="card__footer">
            <div class="btn-group">
                <i class="icon-svg svg-close"></i>
                <v-btn class="btn btn--ghost btn--red" @click="onClose()">Reset</v-btn>
                <v-btn class="btn btn--primary btn--green" @click="onClose()">Apply</v-btn>
            </div>
        </div>
    </form>
</template>

<script>
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
            propertyType: "All", 
            bedrooms: "Select", 
            bathrooms: "Select"
        }
    }, 
    methods: {
        onClose() {
            this.$emit("close")
        },
    }
}
</script>
<style lang="scss" scoped>
.form--filter-projects {
    padding: 0 2.6rem 2.2rem;
    .form__top {
        h3 {
            font-weight: 700;
            font-size: 2rem;
            line-height: 2.7rem;
            text-align: center;
        }
    }
}
.form__fields {
    border-bottom: 0.1rem solid var(--border-color);
    margin-bottom: 2.4rem;
    .form__field {
        margin-bottom: 3.2rem;
        label {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2rem;
            color: var(--color-label);
            margin-bottom: 0.8rem;
        }
        &:last-child {
            margin-bottom: 2.3rem;
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
                margin-right: 9rem;
            }
        }
    }
}
.v-text-field {
    ::v-deep(.v-input__control) {
        .v-text-field__details {
            display: none;
        }
        .v-input__slot {
            padding: 0 1.6rem !important;
            .v-input__prepend-inner {
                margin-right: 0.5rem;
            }
        }

        .v-text-field__slot {
            input::placeholder {
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2rem;
                color: var(--color-title-black);
            }
        }
    }
}
.v-input--selection-controls {
    margin-top: 0;
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
        margin-left: 0.2rem;
    }
}
.form__field-checkbox-custom {
    input {
        border-radius: 50%;
    }
}
.form__field-range-custom {
    display: block;
    position: relative;

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
            color: var(--color-label)
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
            color: var(--color-label)
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
.card__footer {
}
</style>