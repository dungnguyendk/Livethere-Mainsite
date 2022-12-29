<template lang="html">
    <div>
        <img src="~/static/img/banner-dashboard.png" alt="img-banner" class="banner banner-dashboard">
        <div class="container">
            <div class="section-content">
                <InventoryChart />
                <ExpiringLeasesChart />
            </div>
        </div>
    </div>
</template>

<script>
import InventoryChart from './components/Chart/InventoryChart.vue';
import ExpiringLeasesChart from './components/Chart/ExpiringLeasesChart.vue'
export default {
    name: "LandlordDashboard",
    components: { InventoryChart, ExpiringLeasesChart }
}
</script>
<style lang="scss" scoped>
.banner-dashboard {
    width: 100%;
    min-height: 25.5rem;
}

.section-content {
    padding: 4rem 0;
    display: grid;
    grid-column-gap: 2.4rem;
    grid-row-gap: 4.8rem;
    grid-template-columns: repeat(3, 1fr);
}
</style>