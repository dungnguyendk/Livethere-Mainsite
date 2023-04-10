<template>
    <div class="section--property-concierge">
        <div class="container">
            <h3>Your personal property concierge managing all your property needs</h3>
            <div class="section__content">
                <div class="section__left">
                    <img src="/img/Rectangle 1122.png" alt="" />
                </div>
                <div class="section__right">
                    <v-expansion-panels v-model="properties">
                        <v-expansion-panel>
                            <v-expansion-panel-header expand-icon="ri-add-line">
                                <!-- <template v-slot:actions>
                                    <v-icon color="primary">$expand</v-icon>
                                </template> -->
                                <div class="expansion">
                                    <img src="/img/purpose.png" alt="" />
                                    <p>Purpose</p>
                                </div></v-expansion-panel-header
                            >
                            <v-expansion-panel-content
                                ><p>
                                    To improve the renting and leasing experience through our
                                    user-friendly platform and hassle-free process
                                </p>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-header expand-icon="ri-add-line">
                                <!-- <template v-slot:actions>
                                    <v-icon color="primary">$expand</v-icon>
                                </template> -->
                                <div class="expansion">
                                    <img src="/img/vision.png" alt="" />
                                    <p>Vision</p>
                                </div></v-expansion-panel-header
                            >
                            <v-expansion-panel-content
                                ><p>
                                    To improve the renting and leasing experience through our
                                    user-friendly platform and hassle-free process
                                </p>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-header expand-icon="ri-add-line">
                                <div class="expansion">
                                    <img src="/img/mission 1.png" alt="" />
                                    <p>Mission</p>
                                </div></v-expansion-panel-header
                            >
                            <v-expansion-panel-content
                                ><p>
                                    To improve the renting and leasing experience through our
                                    user-friendly platform and hassle-free process
                                </p>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <div class="btn__connect-with-us">
                        <v-btn
                            class="btn btn-custom btn--primary btn--green btn--md"
                            @click="connectFormDialog = true"
                            >Connect with us</v-btn
                        >
                    </div>
                </div>
            </div>
        </div>
        <v-dialog v-model="connectFormDialog" max-width="867" persistent>
            <ConnectFormServicesVue v-if="connectFormDialog" @close="connectFormDialog = false" />
        </v-dialog>
        <!-- <ConnectFormServicesVue /> -->
    </div>
</template>

<script>
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import ConnectFormServicesVue from "../components/Form/ConnectFormServices.vue"
export default {
    name: "PropertyConcierge",
    components: {
        ConnectFormServicesVue,
        Dialog
    },
    data() {
        return {
            connectFormDialog: false,
            sizeDialog: "large",
            properties: [0],
        }
    },
    methods: {
        onCloseDialog() {
            this.connectFormDialog = false
        }
    }
}
</script>

<style lang="scss" scoped>
// .container{
//     background-color: ;
// }
.section--property-concierge {
    background-color: var(--color-white);
    padding-top: 5.4rem;

    h3 {
        margin-bottom: 0;
        display: flex;
        justify-content: center;
        font-family: var(--font-primary);
        color: var(--color-menu);
        font-weight: 800;
        font-size: 2rem;
        line-height: 2.8rem;
    }
    .section__content {
        padding-top: 3.2rem;
        padding-bottom: 5.4rem;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-gap: 6.8rem;
        // align-items: center;
        .section__left {
            display: flex;
            align-items: center;
            img {
                border-radius: 2rem;
                max-width: 57.4rem;
            }
        }
        .section__right {
            padding-top: 2.4rem;
            padding-left: 2.4rem;
            .expansion {
                display: flex;
                // align-items: center;
                p {
                    align-items: center;
                    padding-left: 1.867rem;
                    margin-bottom: 0;
                    color: var(--color-menu);
                    font-weight: 700;
                    font-size: 1.8rem;
                    line-height: 2.8rem;
                }
            }
            p {
                color: var(--color-title-black);
                margin-bottom: 0;
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2.4rem;
            }

            :deep(.v-expansion-panels) {
                .v-expansion-panel--active
                    > .v-expansion-panel-header--active
                    .v-expansion-panel-header__icon:not(.v-expansion-panel-header__icon--disable-rotate)
                    .v-icon::before {
                    content: "\F1AF";
                    color: var(--color-primary);
                    // border-bottom: none !important;
                }
                .v-icon {
                    transform: none;
                }
                .v-icon::before {
                    color: var(--color-primary);
                }
                .v-expansion-panel::before {
                    box-shadow: none !important;
                }
                .v-expansion-panel:nth-child(3) {
                    border-bottom: 0.8px solid var(--border-color) !important;
                }
                .v-expansion-panel-header {
                    padding: 3rem 0 2.6rem !important;
                    border-top: none !important;
                    // padding: 0 !important;
                }
                .v-expansion-panel--active {
                    border-top: 0.8px solid var(--border-color) !important;
                    border-bottom: 0.8px solid var(--border-color) !important;
                    border-radius: 0;
                }
                .v-expansion-panel--active:nth-child(1) {
                    border-top: none !important;
                    border-radius: 0;
                }

                .v-expansion-panel-content__wrap {
                    padding: 1rem 2.4rem 0.5rem 0rem !important;
                }
            }
        }
        .btn__connect-with-us {
            padding-top: 4rem;
        }
        .btn-custom {
            display: inline-block;
            ::v-deep(.v-btn__content) {
                font-size: 1.6rem !important;
                font-weight: 700 !important;
                line-height: 20px !important;
            }
        }
    }
    @media screen and (max-width: 768px) {
        .section__content {
            grid-gap: 4rem;

            .section__left {
                img {
                    max-width: 37.4rem;
                }
            }
            .expansion {
                display: flex;
                align-items: center;

                i {
                    color: var(--color-menu);
                    border: 0.8px solid var(--color-primary);
                }
                p {
                    align-items: center;
                    padding-left: 1.867rem;
                    margin-bottom: 0;
                    font-weight: 700;
                    font-size: 1.8rem;
                    line-height: 2.8rem;
                }
            }
            p {
                color: var(--color-title-black);
                margin-bottom: 0;
                font-weight: 500;
                font-size: 1.4rem;
                line-height: 2.8rem;
            }
        }
        .btn__connect-with-us {
            display: flex;
            justify-content: center;
            padding-top: 2rem;
            padding-bottom: 1.2rem;
        }
    }
    @media screen and (max-width: 425px) {
        h3 {
            display: flex;
            align-items: center;
            text-align: center;
            font-weight: 700;
            font-size: 2rem;
            line-height: 2.8rem;
        }
        padding-top: 2.4rem;
        .section__content {
            grid-gap: 4rem;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            padding-bottom: 2.4rem;
            .section__left {
                display: flex;
                justify-content: center;
            }
            .section__right {
                padding: 0;
            }
            .expansion {
                display: flex;
                align-items: center;

                i {
                    color: var(--color-menu);
                    border: 0.8px solid var(--color-primary);
                }
                p {
                    align-items: center;
                    padding-left: 1.867rem;
                    margin-bottom: 0;
                    font-weight: 700;
                    font-size: 1.8rem;
                    line-height: 2.8rem;
                }
            }
            p {
                color: var(--color-title-black);
                margin-bottom: 0;
                font-weight: 500;
                font-size: 1.4rem;
                line-height: 2.8rem;
            }
        }
        .btn__connect-with-us {
            display: flex;
            justify-content: center;
            padding-top: 2rem;
            padding-bottom: 1.2rem;
        }
    }
}
</style>
