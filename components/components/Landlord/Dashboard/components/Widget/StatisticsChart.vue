<template lang="html">
    <div class="section__widget">
        <div class="widget-header">
            <div class="widget--content">
                <span class="widget-title">{{ source.headerTitle }}</span>
                <span class="price">
                    {{ source.name === "portfolio" ? "SGD" : "" }}
                    {{ currentYear }}
                    {{ source.name === "average" ? "%" : "" }}
                </span>
            </div>
            <div class="widget--percent">
                <div class="svg-header">
                    <img :src="require(`~/static/img/${source.widgetSVG}.svg`)" alt="" />
                </div>
                <img src="~/static/img/icon-up.png" alt="" />
                <span class="percent">{{ currentYearRate }}%</span>
            </div>
        </div>
        <div class="widget-footer">
            <div class="widget--content">
                <span class="widget-title">{{ source.footerTitle }}</span>
                <span class="price">
                    {{ source.name === "portfolio" ? "SGD" : "" }}
                    {{ lastYear }}
                    {{ source.name === "average" ? "%" : "" }}
                </span>
            </div>
            <div class="widget--percent">
                <img src="~/static/img/icon-up.png" alt="" />
                <span class="percent">{{ lastYearRate }}%</span>
            </div>
        </div>
    </div>
</template>

<script>
import { convertNumberToCommas } from "~/ultilities/helpers"
export default {
    name: "StatisticsChart",
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            currentYear: "",
            currentYearRate: "",
            lastYear: "",
            lastYearRate: ""
            // widgetSVG: 'img-widget'
        }
    },
    created() {
        // console.log("this.source::", this.source)
        console.log({ source: this.source })
        if (this.source && this.source.name === "portfolio") {
            /*    this.currentYear = this.source?.estimatedPortfolioPriceCurrentYear
                ? convertNumberToCommas(this.source.estimatedPortfolioPriceCurrentYear)
                : 0*/
            this.currentYearRate = this.source.portfolioPriceYieldRate
                ? this.source.portfolioPriceYieldRate
                : 0
            this.lastYear = this.source.purchasePriceOfPortfolio
                ? convertNumberToCommas(this.source.purchasePriceOfPortfolio)
                : 0
            this.lastYearRate = this.source.purchasePriceOfPortfolioRate
                ? this.source.purchasePriceOfPortfolioRate
                : 0
            // this.widgetSVG = this.source.widgetSVG ? this.source.widgetSVG : "img-widget"
        } else if (this.source && this.source.name === "average") {
            this.currentYear = this.source.averageYieldThisYear
                ? this.source.averageYieldThisYear
                : 0
            this.currentYearRate = this.source.averageYieldThisYearCompare
                ? this.source.averageYieldThisYearCompare
                : 0
            this.lastYear = this.source.averageYieldLastYear ? this.source.averageYieldLastYear : 0
            this.lastYearRate = this.source.averageYieldLastYearCompare
                ? this.source.averageYieldLastYearCompare
                : 0
            // this.widgetSVG = this.source.widgetSVG ? this.source.widgetSVG : "img-widget2"
        } else {
            this.currentYear = ""
            this.currentYearRate = ""
            this.lastYear = ""
            this.lastYearRate = ""
            // this.widgetSVG = "img-widget"
        }
    }
}
</script>
<style lang="scss" scoped>
.section__widget {
    position: relative;
    background: var(--color-white);
    box-shadow: 0px 9px 50px rgba(56, 56, 56, 0.1);
    border-radius: 2rem;
    min-height: 20rem;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
}

.widget-header {
    padding: 1.6rem;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
}

.widget--content {
    display: flex;
    flex-direction: column;

    .widget-title {
        font-weight: 500;
        font-size: 1.6rem !important;
        line-height: 2.2rem !important;
        color: #737373;
    }

    .price {
        font-weight: 700;
        font-size: 2rem;
        line-height: 2.7rem;
        letter-spacing: 0.05rem;
        color: #171717;
    }
}

.widget--percent {
    .percent {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2.2rem;
        text-align: right;
        color: #171717;
    }
}

.widget-footer {
    padding: 1.6rem;
    display: flex;
    justify-content: space-between;
}

.svg-header {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
