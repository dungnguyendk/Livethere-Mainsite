<template lang="html">
    <nav class="nav--tenancy">
        <div v-for="(item, index) in items" class="link" :key="item">
            <div class="link__indicator">
                {{ index + 1 }}
            </div>
            <nuxt-link :to="`/landlord/tenancy/${item.link}/${id}`">
                {{ item.title }}
            </nuxt-link>
        </div>
    </nav>
</template>

<script>
import TenancyDetails from "~/components/components/Landlord/Tenancy/TenancyDetails"

export default {
    name: "TenancyNav",
    components: { TenancyDetails },
    computed: {
        id() {
            return this.$route.params.id
        },
        path() {
            return this.$route.path
        }
    },
    data() {
        return {
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
        background-color: alpha(var(--color-gray), 0.06);
    }

    &.active {
        .link__indicator {
            background-color: var(--color-primary);
        }
    }
}

.nav--tenancy {
    display: grid;
    grid-gap: 4.4rem;
}
</style>
