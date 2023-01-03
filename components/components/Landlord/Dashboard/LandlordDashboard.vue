<template lang="html">
    <div>
        <img src="~/static/img/banner-dashboard.png" alt="img-banner" class="banner banner-dashboard">
        <div class="container">
            <div class="section-content">
                <InventoryChart />
                <ExpiringLeasesChart />
                <StatisticsChart :source="dataWidgetPortfolio" />
                <IncomeChart :source="dataLineChartBlue" />
                <IncomeChart :source="dataLineChartViolet" />
                <StatisticsChart :source="dataWidgetAverage" />
            </div>
        </div>
    </div>
</template>

<script>
import InventoryChart from './components/Chart/InventoryChart.vue';
import ExpiringLeasesChart from './components/Chart/ExpiringLeasesChart.vue'
import IncomeChart from './components/Chart/IncomeChart.vue';
import StatisticsChart from "./components/Widget/StatisticsChart.vue"
import { mapState } from 'vuex';
export default {
    name: "LandlordDashboard",
    components: { InventoryChart, ExpiringLeasesChart, IncomeChart, StatisticsChart },
    data() {
        return {
            dataLineChartBlue: {
                icon: "icon-income-blue",
                img: "line-chart-blue",
                colorPercent: "red",
                percent: "0.5%",
                incomeYear: "2021",
                price: "525,000"
            },
            dataLineChartViolet: {
                icon: "icon-income-violet",
                img: "line-chart-violet",
                colorPercent: "green",
                percent: "6.2%",
                incomeYear: "2022",
                price: "558,000"
            },
            dataWidgetPortfolio: {
                headerTitle: "Estimated Portfolio Price 2022",
                headerNumber: "SGD 21,500,000",
                headerPercent: "3.3%",
                footerTitle: "Purchase Price of Portfolio",
                footerNumber: "SGD 20,800,000",
                footerPercent: "2.1%",
                widgetSVG: "img-widget"
            },
            dataWidgetAverage: {
                headerTitle: "Average Yield 2022",
                headerNumber: "2.6%",
                headerPercent: "13.5%",
                footerTitle: "Average Yield 2021",
                footerNumber: "2.4%",
                footerPercent: "5.1%",
                widgetSVG: "img-widget2"
            }
        }
    }, 
    computed: {
        ...mapState({
            dashboard: (state) => state.dashboard.dashBoards
        })
    }
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

@media only screen and (max-width: 768px) {
    .section-content {
        grid-template-columns: repeat(1, 1fr);
    }

    .banner-dashboard {
        min-height: auto;
    }
}
</style>