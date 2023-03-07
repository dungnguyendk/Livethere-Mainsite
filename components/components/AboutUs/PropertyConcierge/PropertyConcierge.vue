<template>
    <div class="section--property-concierge">
        <div class="container">
            <h3>Your personal property concierge managing all your property needs</h3>
            <div class="section__content">
                <div class="section__left">
                    <img src="/img/Rectangle 1122.png" alt="" />
                </div>
                <div class="section__right">
                    <v-expansion-panels v-model="panel">
                        <v-expansion-panel>
                            <v-expansion-panel-header expand-icon="ri-add-line">
                                <!-- <template v-slot:actions>
                                    <v-icon color="primary">$expand</v-icon>
                                </template> -->
                                <div class="expansion">
                                    <i class="icon-svg sgv-purpose"></i>
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
                                    <i class="icon-svg sgv-vision"></i>
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
                                    <i class="icon-svg sgv-mission"></i>
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
                            class="btn btn--primary btn--green btn--md"
                            @click="connectFormDialog = true"
                            >Connect with us</v-btn
                        >
                    </div>
                </div>
            </div>
        </div>
        <Dialog title="" :open="connectFormDialog" :actions="false">
            <ConnectFormServicesVue />
        </Dialog>
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
            connectFormDialog: false
        }
    }
    // methods:{
    //     onCloseDialog() {
    //         this.connectFormDialog = false
    //     }
    // }
}
</script>

<style lang="scss" scoped>
// .container{
//     background-color: ;
// }
.section--property-concierge {
    background-color: #ffff;
    padding-top: 5.4rem;

    h3 {
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
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-gap: 6.8rem;
        align-items: center;

        .section__left {
            img {
                border-radius: 2rem;
            }
        }
        .section__right {
            .expansion {
                display: flex;
                align-items: center;

                i {
                    color: var(--color-menu);
                    border: 0.8px solid #00634f;
                }
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
            }
            .v-expansion-panel::before {
                box-shadow: none !important;
            }
            :deep(.v-expansion-panels) {
                .v-expansion-panel--active
                    > .v-expansion-panel-header--active
                    .v-expansion-panel-header__icon:not(.v-expansion-panel-header__icon--disable-rotate)
                    .v-icon::before {
                    content: "\F1AF";
                    color: var(--color-menu);
                }
                .v-icon {
                    transform: none;
                }
                .v-icon::before {
                    color: var(--color-menu);
                }
            }
        }
        .btn__connect-with-us {
            padding-top: 4rem;
        }
    }
    @media screen and (max-width: 768px) {
        .section__content {
            grid-gap: 4rem;
            .expansion {
                display: flex;
                align-items: center;

                i {
                    color: var(--color-menu);
                    border: 0.8px solid #00634f;
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
            .section__left {
                display: flex;
                justify-content: center;
            }
            .expansion {
                display: flex;
                align-items: center;

                i {
                    color: var(--color-menu);
                    border: 0.8px solid #00634f;
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
