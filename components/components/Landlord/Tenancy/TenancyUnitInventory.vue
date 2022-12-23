<template lang="html">
    <div :class="`section--tenacy-inventory ${inside ? 'inside' : ''}`">
        <div class="section__top">
            <h3 class="section__heading"> Unit Inventory </h3>
            <div class="section__actions">
                <v-btn class="btn btn--green btn--outline btn--withIcon">
                    <i class="ri-add-box-line"></i> Add
                </v-btn>
            </div>
        </div>
        <TenancyInventoryTable />
    </div>
</template>

<script>
import TenancyInventoryTable from "./Table/TenancyUnitInventory/TenancyUnitInventoryTable.vue"

export default {
    name: "TenancyUnitInventory",
    props: {
        inside: {
            type: Boolean,
            default: false
        }
    },
    components: { TenancyInventoryTable }
}
</script>
<style lang="scss" scoped>
.container {
    padding-top: 2.4rem;
}

.section--tenacy-inventory {
    padding-bottom: 5rem;
    background-color: var(--color-white);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 20px;

    .section__heading {
        font-family: var(--font-primary);
        font-style: normal;
        font-weight: 700;
        font-size: 2rem;
        line-height: 1rem;
        color: var(--color-menu);
        margin: 0;
        align-self: center;
    }

    .section__actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        align-self: center;
    }

    .section__top {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-gap: 1.2rem;
        padding-bottom: 2.4rem;
    }

    &.inside {
        padding: 0;
        box-shadow: none;
        border-radius: 0;
    }

    @media (max-width: 768px) {
        .section__top {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            .section__heading {
                padding: 2.6rem 2.4rem 1.5rem;
                margin: 0;
            }

            .top--button {
                padding-bottom: 1.5rem;
            }
        }
    }
}
</style>
