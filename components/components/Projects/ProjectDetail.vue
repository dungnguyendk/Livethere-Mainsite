<template lang="html">
    <div class="page--project-detail">
        <div class="container">
            <div class="page__top">
                <div class="page__top-left">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Voluptas nemo deserunt nihil veritatis culpa ipsa
                        adipisci illum repudiandae omnis unde. Magnam itaque
                        reiciendis dolores molestiae officiis. Dolores ut quia
                        autem aliquid placeat, molestias laudantium corrupti
                        sapiente cupiditate rerum perferendis, tempora ipsum
                        quis non culpa et assumenda a iure commodi recusandae
                        fugiat. Reprehenderit exercitationem cumque unde ut
                        nihil, laudantium atque illum alias, blanditiis, laborum
                        quibusdam voluptatem maxime necessitatibus aperiam. Enim
                        facilis iste repudiandae quae porro fugit, quasi ex
                        consectetur? Consectetur, obcaecati nesciunt sit
                        voluptate fuga eaque soluta, accusantium deserunt
                        laborum quas dolores, sequi vel doloremque laboriosam
                        maxime labore consequatur! Amet, cum!</p>
                </div>
                <div class="page__top-right">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.107901410066!2d106.71887761533426!3d10.803047261654479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529f8273eaed5%3A0x27fe58a754c470b0!2zQ8O0bmcgdHkgQ-G7lSBwaOG6p24gxJDhuqd1IFTGsCBYw6J5IEThu7FuZyBCY29ucw!5e0!3m2!1sen!2s!4v1676437005731!5m2!1sen!2s"
                        style="border:0;"
                        allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        class="page__top-map">
                    </iframe>
                </div>
            </div>
            <div class="page__content">
                <div class="page__content-left">
                    <v-expansion-panels flat>
                        <v-expansion-panel class="expansion-description expansion-panel-custom">
                            <v-expansion-panel-header
                                expand-icon="mdi-menu-down">
                                Description
                                <template v-slot:actions>
                                    <v-icon color="primary">
                                        $expand
                                    </v-icon>
                                </template>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <p>The centrepiece of an iconic integrated
                                    development comprising three landmarks –
                                    Stamford House, Capitol Building and
                                    Capitol
                                    Theatre. Located in the Civic District,
                                    perched above Singapore’s well-known
                                    historical street corner, the curved
                                    residential block offers a front row
                                    seat to
                                    the city’s Civic and Cultural District
                                    as
                                    well as spectacular views of Marina Bay
                                    and
                                    beyond.</p>
                                <p>Eden Residences Capitol is a luxurious
                                    residential edifice that sits across the
                                    road from The City Hall MRT Interchange
                                    and
                                    is literally a stone’s throw away to
                                    Peninsula Plaza and Raffles City. Living
                                    in
                                    the Eden Residences Capitol provides an
                                    easy
                                    access to the fitness and recreational
                                    parks
                                    like that of Fort Canning Park.
                                    Residents
                                    can also enjoy the convenience of the
                                    amenities nearby such as banks,
                                    supermarket,
                                    retails outlets, restaurants and other
                                    necessities.</p>
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
                                        <div class="expansion-amenities-column" v-for="(item, index) in listAmenities" :key="index">
                                            <div class="expansion-amenities-icon" v-for="(element, index) in item.listIcons" :key="index">
                                                <i :class="element.icon"></i>
                                                <p>{{ element.text }}</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>
                <div class="page__content-right">
                    <ContactAgentCard/>
                    <EnquiryForm/>
                    <NotiCard/>
                </div>
            </div>

            </div>
                </div>
            </template>

            <script>
import EnquiryForm from "~/components/components/Projects/components/Form/EnquiryForm"
import ContactAgentCard from "./components/Card/ContactAgentCard.vue"
import NotiCard from "~/components/components/Projects/components/Card/NotiCard"
export default {
    name: "ProjectListing",
    components: { EnquiryForm, ContactAgentCard, NotiCard },
    data() {
        return {
            listGallery: [
                {
                    id: 1,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_1.jpeg`)
                },
                {
                    id: 2,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_2.jpeg`)
                },
                {
                    id: 3,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_3.jpeg`)
                },
                {
                    id: 4,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_4.jpeg`)
                },
                {
                    id: 5,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_5.jpeg`)
                },
                {
                    id: 6,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_6.jpeg`)
                },
                {
                    id: 7,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_7.jpeg`)
                },
                {
                    id: 8,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_8.jpeg`)
                }
            ],
            listAmenities: [
                {
                    id: 1,
                    listIcons: [
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
                        }
                    ]
                },
                {
                    id: 2,
                    listIcons: [
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
                        }
                    ]
                },
                {
                    id: 3,
                    listIcons: [
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
                    ]
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.page--project-detail {
    //left: 66.98
    //right: 33.02
}
.page__top {
    margin: 2.4rem 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .page__top-left {
        width: 66.98%;
        margin-right: 1.2rem;
    }
    .page__top-right {
        width: 33.02%;
        margin-left: 1.2rem;
        .page__top-map {
            height: 49.2rem;
            border-radius: 2rem;
            width: 100%;
        }
    }
}
.page__content {
    display: flex;

    .page__content-left {
        width: 66.98%;
        padding-right: 12.3rem;
    }
    .page__content-right {
        width: 33.02%;
    }
}
.expansion-panel-custom {
    border-bottom: 0.1rem solid var(--border-color);
    .v-expansion-panel-header {
        font-weight: 700;
        font-size: 2rem;
        line-height: 2rem;
    }
    .v-expansion-panel-content {
        p {
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-title-black);
        }
    }
}
.icon-custom {
    color: var(--color-primary) !important;
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
.expansion-amenities-row{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
