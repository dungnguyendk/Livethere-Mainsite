<template lang="html">
    <div class="section--landing-cta">
        <div class="container">
            <div class="section__container">
                <div class="section__left">
                    <div class="section__image">
                        <img :src="imgURL" alt="" />
                    </div>
                </div>
                <div class="section__right">
                    <div class="section__right-content">
                        <h3 class="section__content-title">
                            Bump up your property’s visibility with Livethere now</h3>
                        <p class="section__content-text">
                            With our tailored marketing services, we’ll put you and your property high on our priority list!
                        </p>
                        <v-btn class="btn btn--primary btn--green" @click="openContactUsDialog = true">List Your
                            Property</v-btn>
                        <Dialog :open="openContactUsDialog" @close="closeDialog" :actions="false" :size="sizeDialog"
                            :title="''">
                            <ContactUsForm @close="openContactUsDialog = false" :isContactUs="false"
                                v-if="openContactUsDialog" titleContact="List with Livethere today"/>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import ContactUsForm from "~/components/shared/Header/Form/ContactUsForm.vue"
export default {
    name: "LandlordLandingCTA",
    components: { Dialog, ContactUsForm },
    data() {
        return {
            imgURL: "/img/landlords/landing-cta.png",
            sizeDialog: "medium",
            openContactUsDialog: false
        }
    },
    methods: {
        closeDialog() {
            this.openContactUsDialog = false
        }
    }
}
</script>

<style lang="scss" scoped>
.section--landing-cta {
    padding: 4.3rem 0;

    .section__container {
        display: flex;
        justify-content: center;
        align-items: center;

        .section__left {
            width: 54.77%;
            padding-right: 6.8rem;

            .section__image {
                img {
                    width: 100%;
                    object-fit: cover;
                    border-radius: 20px;
                }
            }
        }

        .section__right {
            width: 45.22%;

            .section__right-content {
                .section__content-title {
                    font-weight: 800;
                    font-size: 2rem;
                    line-height: 2.8rem;
                    color: var(--color-primary);
                    text-align: left;
                    margin-bottom: 2.4rem;
                }

                .section__content-text {
                    font-weight: 500;
                    font-size: 1.6rem;
                    line-height: 2.4rem;
                    color: #171717;
                    text-align: left;
                    margin-bottom: 2.4rem;
                }
            }
        }
    }

    @media screen and(max-width: 768px) {
        max-width: 42rem;
        margin: 0 auto;

        .section__container {
            display: block;

            .section__left {
                width: 100%;
                padding-right: 0;

                .section__image {
                    margin-bottom: 1.5rem;

                    img {
                        width: 100%;
                        object-fit: cover;
                    }
                }
            }

            .section__right {
                width: 100%;

                .section__right-content {
                    .section__content-title {
                        font-weight: 800;

                        text-align: justify;
                    }

                    .section__content-text {
                        text-align: justify;
                    }
                }
            }
        }
    }
}
</style>
