<template lang="html">
    <nav v-if="tenancyDetails || inventoryDetails" class="nav--tenancy">
        <div
            v-for="(item, index) in items"
            :class="`link ${checkActivePath(item.link) ? 'active' : ''}`"
            :key="index"
        >
            <div class="link__indicator">
                {{ index + 1 }}
            </div>
            <nuxt-link
                :to="`/tenancy/${item.link}/${
                    tenancyDetails ? tenancyDetails.internalID : ''
                }`"
            >
                {{ item.title }}
            </nuxt-link>
        </div>
    </nav>
</template>

<script>
import TenancyDetails from "~/components/components/Landlord/Tenancy/TenancyDetails"
import { mapState } from "vuex"

export default {
    name: "TenancyNav",
    components: { TenancyDetails },
    computed: {
        ...mapState({
            tenancyDetails: (state) => state.tenancy.tenancyDetails
        }),
        path() {
            return this.$route.path
        }
    },
    methods: {
        checkActivePath(path) {
            return this.$route.path.includes(path)
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
    }
}
</script>
<style lang="scss" scoped>
.link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    grid-gap: 1.6rem;

    .link__indicator {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        font-size: 1.6rem;
        font-weight: 500;
        position: relative;
        z-index: 9;
        background-color: #e5e5e5;
    }

    a {
        font-size: 1.6rem;
    }

    &.active {
        .link__indicator {
            background-color: var(--color-primary);
            color: #fff;
        }

        a {
            color: var(--color-primary);
            font-weight: 600;
        }
    }
}

.nav--tenancy {
    position: relative;
    display: grid;
    grid-gap: 4.4rem;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 1.6rem;
        width: 1px;
        height: 100%;
        background-color: #e5e5e5;
        transform: translateX(-50%);
        z-index: 1;
    }

    .link {
        position: relative;
        z-index: 9;
    }
}
@media (max-width: 1279px) {
    .nav--tenancy {
        position: relative;
        display: grid;
        grid-gap: 2.4rem;

        &:before {
            content: "";
            position: absolute;
            top: 0;
            left: 1.6rem;
            width: 1px;
            height: 100%;
            background-color: #e5e5e5;
            transform: translateX(-50%);
            z-index: 1;
        }
    }
}
@media (max-width: 1023px) {
    .nav--tenancy {
        display: none;
    }
}
@media (max-width: 767px) {
    .link {
        display: flex;
        grid-gap: 1.6rem;
        min-width: 19rem;

        .link__indicator {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            font-size: 1.6rem;
            font-weight: 500;
            position: relative;
            z-index: 9;
            background-color: #e5e5e5;
        }
    }
    .nav--tenancy {
        display: none;
    }
}
</style>
