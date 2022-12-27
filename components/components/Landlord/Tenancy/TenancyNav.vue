<template lang="html">
    <nav>
        <div v-for="(item, index) in items" class="link" :key="item">
            <div class="link__indicator">
                {{ index + 1 }}
            </div>
            <nuxt-link :to="item.link">
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
    data() {
        return {
            items: [
                {
                    title: "Tenancy Details",
                    link: "details"
                },
                {
                    title: "Tenancy Agreement",
                    link: "tenancy-agreement"
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
    flex-direction: column;

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
        }
    }
}
</style>
