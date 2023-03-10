<template>
    <div class="section--listing-expansion-panel">
        <v-expansion-panels flat v-model="panel" multiple>
            <v-expansion-panel
                expand
                v-model="panel"
                class="expansion-description expansion-panel-custom"
            >
                <v-expansion-panel-header expand-icon="mdi-menu-down">
                    Description
                    <template v-slot:actions>
                        <v-icon color="primary"> $expand </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <p
                        >The centrepiece of an iconic integrated development comprising three
                        landmarks – Stamford House, Capitol Building and Capitol Theatre. Located in
                        the Civic District, perched above Singapore’s well-known historical street
                        corner, the curved residential block offers a front row seat to the city’s
                        Civic and Cultural District as well as spectacular views of Marina Bay and
                        beyond.</p
                    >
                    <p
                        >Eden Residences Capitol is a luxurious residential edifice that sits across
                        the road from The City Hall MRT Interchange and is literally a stone’s throw
                        away to Peninsula Plaza and Raffles City. Living in the Eden Residences
                        Capitol provides an easy access to the fitness and recreational parks like
                        that of Fort Canning Park. Residents can also enjoy the convenience of the
                        amenities nearby such as banks, supermarket, retails outlets, restaurants
                        and other necessities.</p
                    >
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="expansion-property expansion-panel-custom">
                <v-expansion-panel-header expand-icon="mdi-menu-down">
                    Property Details
                    <template v-slot:actions>
                        <v-icon color="primary"> $expand </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div class="expansion-property-row">
                        <p>monthly price:</p>
                        <p>S$ 30,000 </p>
                    </div>
                    <div class="expansion-property-row">
                        <p>unit size:</p>
                        <p>5,963 sqft </p>
                    </div>
                    <div class="expansion-property-row">
                        <p>monthly price PSF:</p>
                        <p>S$ 5.03</p>
                    </div>
                    <div class="expansion-property-row">
                        <p>lease term:</p>
                        <p>24 months </p>
                    </div>
                    <div class="expansion-property-row">
                        <p>furnishing:</p>
                        <p>Fully Furnished</p>
                    </div>
                    <div class="expansion-property-row">
                        <p>built year:</p>
                        <p>2015</p>
                    </div>
                    <div class="expansion-property-row">
                        <p>tenure:</p>
                        <p>99-year Leasehold</p>
                    </div>
                    <div class="expansion-property-row">
                        <p>property type:</p>
                        <p>Condo</p>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="expansion-available expansion-panel-custom">
                <v-expansion-panel-header expand-icon="mdi-menu-down">
                    Available from
                    <template v-slot:actions>
                        <v-icon color="primary"> $expand </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div class="available-from-row">
                        <i class="icon-svg svg-calendar"></i>
                        <p>2022-02-01</p>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="expansion-amenities expansion-panel-custom">
                <v-expansion-panel-header expand-icon="mdi-menu-down">
                    Amenities
                    <template v-slot:actions>
                        <v-icon color="primary"> $expand </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div class="expansion-amenities-row">
                        <div
                            class="expansion-amenities-column"
                            v-for="(item, index) in listAmenities"
                            :key="index"
                        >
                            <div class="expansion-amenities-icon">
                                <i :class="item.icon"></i>
                                <p>{{ item.text }}</p>
                            </div>
                        </div>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
export default {
    name: "PanelListing",
    data() {
        return {
            panel: [0, 1, 2, 3], 
            listAmenities: [
                {
                    id: 1,
                    icon: "icon-svg svg-free-wifi",
                    text: "free wifi"
                },
                {
                    id: 2,
                    icon: "icon-svg svg-pool",
                    text: "pool"
                },
                {
                    id: 3,
                    icon: "icon-svg svg-bathtub",
                    text: "bathtub"
                },
                {
                    id: 4,
                    icon: "icon-svg svg-spa",
                    text: "spa"
                },
                {
                    id: 5,
                    icon: "icon-svg svg-sauna",
                    text: "sauna"
                },
                {
                    id: 6,
                    icon: "icon-svg svg-bbq",
                    text: "BBQ"
                },
                {
                    id: 7,
                    icon: "icon-svg svg-concierge",
                    text: "concierge"
                },
                {
                    id: 8,
                    icon: "icon-svg svg-game-room",
                    text: "games room"
                },
                {
                    id: 9,
                    icon: "icon-svg svg-tennis-court",
                    text: "tennis-court"
                },
                {
                    id: 10,
                    icon: "icon-svg svg-patio",
                    text: "patio"
                },
                {
                    id: 11,
                    icon: "icon-svg svg-taxi",
                    text: "taxi"
                },
                {
                    id: 12,
                    icon: "icon-svg svg-pet-allowed",
                    text: "pets allowed"
                },
                {
                    id: 13,
                    icon: "icon-svg svg-pool-view",
                    text: "pool view"
                },
                {
                    id: 14,
                    icon: "icon-svg svg-jacuzzi",
                    text: "jacuzzi"
                },
                {
                    id: 15,
                    icon: "icon-svg svg-gym",
                    text: "gym"
                },
                {
                    id: 16,
                    icon: "icon-svg svg-yoga",
                    text: "yoga"
                },
                {
                    id: 17,
                    icon: "icon-svg svg-gourmet-kitchen",
                    text: "gourmet kitchen"
                },
                {
                    id: 18,
                    icon: "icon-svg svg-restaurant",
                    text: "restaurant"
                },
                {
                    id: 19,
                    icon: "icon-svg svg-playground",
                    text: "playground"
                },
                {
                    id: 20,
                    icon: "icon-svg svg-squash-court",
                    text: "squash court"
                },
                {
                    id: 21,
                    icon: "icon-svg svg-social-lounge",
                    text: "social lounge"
                }
            ],
        }
    },

    mounted() {},

    methods: {}
}
</script>

<style lang="scss" scoped>
.section--listing-expansion-panel{
    @media screen and (max-width: 820px) {
        .expansion-amenities-row {
            grid-template-columns: repeat(2, 1fr);
        }
    }
}
.expansion-panel-custom {
    border-bottom: 0.1rem solid var(--border-color);
    margin-top: 0;
    border-radius: 0 !important;
    background: transparent !important;
    .v-expansion-panel-header {
        font-weight: 700;
        font-size: 2rem;
        line-height: 2rem;
        padding: 0;
    }
    .v-expansion-panel-header__icon {
        i {
            font-size: 3.5rem;
        }
    }
    .v-expansion-panel-content {
        p {
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-title-black);
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    ::v-deep(.v-expansion-panel-content__wrap) {
        padding: 0 0 2.4rem;
    }
    &::before {
        box-shadow: none;
    }
    &:nth-child(4) {
        border-bottom: none;
    }
}
.expansion-property-row {
    display: flex;
    align-items: center;
    p {
        margin-bottom: 0;
        &:first-child {
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 3.2rem;
            color: var(--color-label);
            text-transform: capitalize;
            margin-right: 6.4rem;
            width: 14.1rem;
        }
        &:last-child {
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 3.2rem;
            color: var(--color-title-black);
            text-align: left;
        }
    }
}
.available-from-row {
    display: flex;
    align-items: center;
    i {
        background-color: var(--color-title-black);
        margin-right: 0.8rem;
    }
    p {
        margin-bottom: 0;
    }
}
.expansion-amenities-icon {
    display: flex;
    align-items: center;
    margin-bottom: 1.7rem;
    p {
        margin-bottom: 0;
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--color-title-black);
        text-transform: capitalize;
        margin-left: 1.2rem;
    }
}
.expansion-amenities-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
</style>
