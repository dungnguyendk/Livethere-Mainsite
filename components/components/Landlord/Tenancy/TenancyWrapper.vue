<template lang="html">
    <div class="section--tenancy">
        <div class="container">
            <div class="section__top">
                <v-btn class="btn btn--outline btn--green btn--md btn-back" @click="onBack">
                    <i class="ri-arrow-left-line"></i>
                    Back
                </v-btn>
                <div class="select-type">
                    <v-select
                        v-model="itemSelected"
                        :items="items"
                        item-text="title"
                        item-value="link"
                        hide-details
                        outlined
                        dense
                        class="me-2"
                        @change="onChangeLink"
                    />
                </div>
            </div>
            <div class="section__wrapper">
                <div class="section__left">
                    <TenancyNav />
                </div>
                <div class="section__right">
                    <slot name="content" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TenancyDetailsPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyDetailsPanel.vue"
import TenancyNav from "~/components/components/Landlord/Tenancy/TenancyNav"
import TenancyInfoPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyInfoPanel"
import { mapState } from "vuex"

export default {
    name: "TenancyWrapper",
    components: { TenancyInfoPanel, TenancyNav, TenancyDetailsPanel },
    computed: {
        ...mapState({
            tenancyDetails: (state) => state.tenancy.tenancyDetails
        })
    },
    methods: {
        onBack() {
            if (this.tenancyDetails) {
                this.$router.push(`/tenancy/${this.tenancyDetails.inventoryInternalID}`)
            }
        },
        onChangeLink() {
            const id = this.$route.params.id
            this.$router.push(`/tenancy/${this.itemSelected}/${id}`)
        }
    },
    created() {
        // this.itemSelected = this.tenancyLinks
        const path = this.$route.path
        const currentItem = this.items.find((item) => path.includes(item.link))
        this.itemSelected = currentItem
    },
    data() {
        return {
            currentItem: null,
            items: [
                {
                    title: "Tenancy Details",
                    link: "details"
                },
                {
                    title: "Tenancy Agreement",
                    link: "agreements"
                },
                {
                    title: "Stamp Duty",
                    link: "stamp-duty"
                },
                {
                    title: "Expenses",
                    link: "expenses"
                },
                {
                    title: "Unit Inventory",
                    link: "unit-inventory"
                }
            ]
        }
    }
}
</script>
<style lang="scss">
.section--tenancy {
    padding: 3.2rem 0;

    .section__top {
        padding-bottom: 3.2rem;
        display: flex;
        justify-content: space-between;
    }

    .select-type {
        // height: 1.8rem;
        display: none;
    }

    .section__right {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        grid-gap: 2.4rem;
    }

    .section__wrapper {
        display: grid;
        grid-template-columns: 30rem minmax(0, 1fr);
        grid-gap: 2.4rem;
    }

    @media screen and (max-width: 1023px) {
        padding: 3.2rem 0;
        .section__top {
            display: flex;
            // grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
            align-items: flex-end;
            grid-gap: 1.2rem;

            > * {
                align-self: center;
            }

            .btn-back {
                max-width: 9rem;

                i {
                    padding-right: 0.4rem;
                }
            }
        }
        .section__right {
            padding-top: 1.2rem;
        }
        .select-type {
            // justify-content: flex-end;
            display: block;
            max-width: 24rem;
        }
        .section__wrapper {
            display: block;
        }
    }

    @media screen and (max-width: 767px) {
        padding: 3.2rem 0;
        .section__top {
            display: flex;
            // grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
            align-items: flex-end;
            grid-gap: 1.2rem;

            > * {
                align-self: center;
            }

            .btn-back {
                max-width: 9rem;

                i {
                    padding-right: 0.4rem;
                }
            }
        }

        .section__right {
            padding-top: 1.2rem;
        }
        .select-type {
            justify-content: flex-end;
            display: flex;
            max-width: 18rem;
        }
        .section__wrapper {
            display: block;
        }
    }
}
</style>
