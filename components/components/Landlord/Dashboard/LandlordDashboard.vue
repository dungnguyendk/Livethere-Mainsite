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
        <div class="container">
            <h5>Disclaimer</h5>
            <p>All of the above information is for reference only. Although reasonable and cautious measures are applied to
                prepare the above information, Livethere/Savills does not warrant the accuracy, timeliness, reasonableness
                or completeness of any such information and valuation or whether they are fit for any purposes.
                Livethere/Savills does not assume any liabilities of any kind to you for any reliance on such information
                and valuation or owe any duty of care to you as a result of providing such information.</p>
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
        return {}
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
                        this.dashboard.estimatedPortfolioPriceCurrentYear ? this.dashboard.estimatedPortfolioPriceCurrentYear : 0,
                    portfolioPriceYieldRate: this.dashboard.portfolioPriceYieldRate ? this.dashboard.portfolioPriceYieldRate.toFixed(2) : 0,
                    purchasePriceOfPortfolio: this.dashboard.purchasePriceOfPortfolio ? this.dashboard.purchasePriceOfPortfolio : 0,
                    purchasePriceOfPortfolioRate: this.dashboard.purchasePriceOfPortfolioRate ? this.dashboard.purchasePriceOfPortfolioRate.toFixed(2) : 0,
                    widgetSVG: "img-widget"
                }
                : null
        },
        average() {
            return this.dashboard
                ? {
                    name: "average",
                    headerTitle: `Average Gross Yield ${this.dashboard.currentYear}`,
                    footerTitle: `Average Gross Yield ${this.dashboard.lastYear}`,
                    averageYieldThisYear: this.dashboard.averageYieldThisYear ? this.dashboard.averageYieldThisYear.toFixed(2) : 0,
                    averageYieldThisYearCompare: this.dashboard.averageYieldThisYearCompare ? this.dashboard.averageYieldThisYearCompare.toFixed(2) : 0,
                    averageYieldLastYear: this.dashboard.averageYieldLastYear ? this.dashboard.averageYieldLastYear.toFixed(2) : 0,
                    averageYieldLastYearCompare: this.dashboard.averageYieldLastYearCompare ? this.dashboard.averageYieldLastYearCompare.toFixed(2) : 0,
                    widgetSVG: "img-widget2"
                }
                : null
        },
        incomeLastYear() {
            return this.dashboard
                ? {
                    name: "Last year",
                    icon: "icon-income-blue",
                    incomeYear: this.dashboard.lastYear ? this.dashboard.lastYear : 0,
                    // img: "line-chart-blue",
                    // labels: this.dashboard.lastYearIncomeData ? this.dashboard.lastYearIncomeData.map((val) => val.name) : [],
                    data: this.dashboard.lastYearIncomeData ? this.dashboard.lastYearIncomeData.map((val) => val.value) : [],
                    // checkBackgroundColor: this.dashboard.lastYearIncomeData.map((val) => val.forecastValue),
                    price: this.dashboard.incomeLastYear ? this.dashboard.incomeLastYear : 0,
                    incomeRate: this.dashboard.incomeLastYearRate ? this.dashboard.incomeLastYearRate.toFixed(2) : 0,
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
                    incomeYear: this.dashboard.currentYear ? this.dashboard.currentYear : 0,
                    labels: this.dashboard.currentYearIncomeData ? this.dashboard.currentYearIncomeData.map((val) => val.name) : [],
                    data: this.dashboard.currentYearIncomeData ? this.dashboard.currentYearIncomeData.map((val) => val.value) : [],
                    // checkBackgroundColor: this.dashboard.currentYearIncomeData.map((val) => val.forecastValue),
                    price: this.dashboard.incomeCurrentYear ? this.dashboard.incomeCurrentYear : 0,
                    incomeRate: this.dashboard.incomeCurrentYearRate ? this.dashboard.incomeCurrentYearRate.toFixed(2) : 0,
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

@media only screen and (max-width: 820px) {
    .section-content {
        grid-template-columns: repeat(1, 1fr);
    }

    .banner-dashboard {
        min-height: auto;
    }
}
</style>
