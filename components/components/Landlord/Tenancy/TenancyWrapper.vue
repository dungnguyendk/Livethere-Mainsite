<template lang="html">
    <div class="section--tenancy">
        <div class="container">
            <div class="section__top">
                <v-btn class="btn btn--outline btn--green btn--sm" @click="onBack">
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
            tenancyLinks: (state) => state.tenancy.tenancyLinks
        })
    },
    methods: {
        onBack() {
            this.$store.commit("tenancy/setTenancyLink", "details")
            this.$emit("onBack")
        },
        onChangeLink() {
            const id = this.$route.params.id
            this.$store.commit("tenancy/setTenancyLink", this.itemSelected)
            this.$router.push(`/landlord/tenancy/${this.itemSelected}/${id}`)
        }
    },

    data() {
        return {
            itemSelected: {
                title: "Item selected",
                link: "details"
            },
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
    },
    created() {
        this.itemSelected = this.tenancyLinks
    },
    watch: {
        itemSelected() {
            if (this.tenancyLinks) {
                this.itemSelected = this.tenancyLinks
            }
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
        display: none;
    }
    .section__right {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        grid-gap: 2.4rem;
    }

    .section__wrapper {
        display: grid;
        grid-template-columns: 34rem minmax(0, 1fr);
        grid-gap: 5.2rem;
    }
}
@media (max-width: 768px) {
    .section--tenancy {
        padding: 3.2rem 0;

        // .section__left{
        //     display: none;
        // }
        .section__right {
            padding-top: 1.2rem;
        }
        .select-type {
            display: block;
        }
        .section__wrapper {
            display: block;
        }
    }
}
</style>
