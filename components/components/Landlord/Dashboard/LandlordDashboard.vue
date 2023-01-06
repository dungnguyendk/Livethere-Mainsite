<template lang="html">
    <div>
        <img src="~/static/img/banner-dashboard.png" alt="img-banner" class="banner banner-dashboard" />
        <div class="container" v-if="dashboard">
            <div class="section-content">
                <InventoryChart />
                <ExpiringLeasesChart />
                <StatisticsChart :source="portfolio" />
                <IncomeChart :source="incomeLastYear" />
                <IncomeChart :source="incomeCurrentYear" />
                <StatisticsChart :source="average" />
            </div>
        </div>
        <div class="container dashboard-no-data" v-else>
            <strong>No data found!</strong>
        </div>
    </div>
</template>

<script>
import InventoryChart from "./components/Chart/InventoryChart.vue"
import ExpiringLeasesChart from "./components/Chart/ExpiringLeasesChart.vue"
import IncomeChart from "./components/Chart/IncomeChart.vue"
import StatisticsChart from "./components/Widget/StatisticsChart.vue"
import { mapState } from "vuex"

export default {
    name: "LandlordDashboard",
    components: { InventoryChart, ExpiringLeasesChart, IncomeChart, StatisticsChart },
    data() {
        return {
            // dataLineChartBlue: {
            //     icon: "icon-income-blue",
            //     img: "line-chart-blue",
            //     colorPercent: "red",
            //     percent: "0.5%",
            //     incomeYear: "2021",
            //     price: "525,000"
            // },
            // dataLineChartViolet: {
            //     icon: "icon-income-violet",
            //     img: "line-chart-violet",
            //     colorPercent: "green",
            //     percent: "6.2%",
            //     incomeYear: "2022",
            //     price: "558,000"
            // },
            // dataWidgetPortfolio: {
            //     headerTitle: "Estimated Portfolio Price 2022",
            //     headerNumber: "SGD 21,500,000",
            //     headerPercent: "3.3%",
            //     footerTitle: "Purchase Price of Portfolio",
            //     footerNumber: "SGD 20,800,000",
            //     footerPercent: "2.1%",
            //     widgetSVG: "img-widget"
            // },
            // dataWidgetAverage: {
            //     headerTitle: "Average Yield 2022",
            //     headerNumber: "2.6%",
            //     headerPercent: "13.5%",
            //     footerTitle: "Average Yield 2021",
            //     footerNumber: "2.4%",
            //     footerPercent: "5.1%",
            //     widgetSVG: "img-widget2"
            // }
        }
    },
    computed: {
        ...mapState({
            dashboard: (state) => state.dashboard.dashBoards
        }),
        portfolio() {
            return this.dashboard
                ? {
                    name: "portfolio",
                    headerTitle: `Estimated Portfolio Price ${this.dashboard.currentYear}`,
                    footerTitle: "Purchase Price of Portfolio",
                    estimatedPortfolioPriceCurrentYear:
                        this.dashboard.estimatedPortfolioPriceCurrentYear,
                    portfolioPriceYieldRate: this.dashboard.portfolioPriceYieldRate.toFixed(2),
                    purchasePriceOfPortfolio: this.dashboard.purchasePriceOfPortfolio,
                    purchasePriceOfPortfolioRate: this.dashboard.purchasePriceOfPortfolioRate.toFixed(2),
                    widgetSVG: "img-widget"
                }
                : null
        },
        average() {
            return this.dashboard
                ? {
                    name: "average",
                    headerTitle: `Average Yield ${this.dashboard.lastYear}`,
                    footerTitle: `Average Yield ${this.dashboard.currentYear}`,
                    averageYieldThisYear: this.dashboard.averageYieldThisYear.toFixed(2),
                    averageYieldThisYearCompare: this.dashboard.averageYieldThisYearCompare.toFixed(2),
                    averageYieldLastYear: this.dashboard.averageYieldLastYear.toFixed(2),
                    averageYieldLastYearCompare: this.dashboard.averageYieldLastYearCompare.toFixed(2),
                    widgetSVG: "img-widget2"
                }
                : null
        },
        incomeLastYear() {
            return this.dashboard
                ? {
                    name: "Last year",
                    icon: "icon-income-blue",
                    incomeYear: this.dashboard.lastYear,
                    // img: "line-chart-blue",
                    // labels: this.dashboard.lastYearIncomeData ? this.dashboard.lastYearIncomeData.map((val) => val.name) : [],
                    data: this.dashboard.lastYearIncomeData ? this.dashboard.lastYearIncomeData.map((val) => val.value) : [],
                    // checkBackgroundColor: this.dashboard.lastYearIncomeData.map((val) => val.forecastValue),
                    price: this.dashboard.incomeLastYear,
                    incomeRate: this.dashboard.incomeLastYearRate.toFixed(2),
                    lineColor: "hsla(195, 79%, 63%, 1)"
                }
                : null
        },
        incomeCurrentYear() {
            return this.dashboard
                ? {
                    name: "Current year",
                    icon: "icon-income-violet",
                    // img: "line-chart-blue",
                    incomeYear: this.dashboard.currentYear,
                    labels: this.dashboard.currentYearIncomeData ? this.dashboard.currentYearIncomeData.map((val) => val.name) : [],
                    data: this.dashboard.currentYearIncomeData ? this.dashboard.currentYearIncomeData.map((val) => val.value) : [],
                    // checkBackgroundColor: this.dashboard.currentYearIncomeData.map((val) => val.forecastValue),
                    price: this.dashboard.incomeCurrentYear,
                    incomeRate: this.dashboard.incomeCurrentYearRate.toFixed(2),
                    lineColor: this.dashboard.currentYearIncomeData ? this.dashboard.currentYearIncomeData.map((val) => val.forecastValue ? "rgba(153, 102, 255, 0.2)" : "hsla(240, 64%, 62%, 1)") : []
                }
                : null
        }
    },
    created() {
        // console.log("incomeLastYear::", this.dashboard.lastYearIncomeData.map((val) => val.name))
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

.dashboard-no-data {
    text-align: center;
    margin-top: 1.2rem;

    strong {
        font-size: 3.2rem;
    }
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
