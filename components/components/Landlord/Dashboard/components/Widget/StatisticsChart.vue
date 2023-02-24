<template lang="html">
    <div class="section__widget">
        <div class="widget-header">
            <div class="widget--content">
                <div class="widget-form">
                    <span class="widget-title">{{ source.headerTitle }}</span>
                    <v-tooltip bottom v-if="source.name === 'portfolio'">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon color="red" v-bind="attrs" v-on="on" class="icon-warning">
                                ri-error-warning-line
                            </v-icon>
                        </template>
                        <span>Not included Landed Property!</span>
                    </v-tooltip>
                </div>
                <span class="price">
                    {{ source.name === "portfolio" ? "S$" : "" }}
                    {{ currentYear ? currentYear : '-' }}
                    {{ source.name === "average" ? (currentYear ? "%" : "") : "" }}
                </span>
            </div>
            <div class="widget--percent">
                <div class="svg-header">
                    <img :src="require(`~/static/img/${source.widgetSVG}.svg`)" alt="" />
                </div>
                <!-- <v-tooltip bottom v-if="source.name === 'portfolio'">
                    <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on" class="icon-warning">
                            <span class="percent--custom">PPI</span>
                        </div>
                    </template>
                    <span>
                        Property Performance Index <br />
                        Index = Current Year Est. Market Value / Last Year’s Est. Market Value
                    </span>
                </v-tooltip>
                <v-tooltip bottom v-if="source.name === 'portfolio'">
                    <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on" class="icon-warning">
                            <img :src="require(`~/static/img/icon-${currentYearRate > 0 ? 'up' : 'down'}.svg`)" alt=""
                                v-if="currentYearRate" />
                            <span class="percent">{{ currentYearRate ? `${currentYearRate}%` : '-' }}</span>
                        </div>
                    </template>
                    <span>Compared to the previous year</span>
                </v-tooltip> -->
                <!-- <div v-else>
                    <img :src="require(`~/static/img/icon-${currentYearRate > 0 ? 'up' : 'down'}.svg`)" alt=""
                        v-if="currentYearRate" />
                    <span class="percent">{{ currentYearRate ? `${currentYearRate}%` : '-' }}</span>
                </div> -->
            </div>
        </div>
        <div class="widget-footer">
            <div class="widget--content">
                <span class="widget-title">{{ source.footerTitle }}</span>
                <span class="price">
                    {{ source.name === "portfolio" ? "S$" : "" }}
                    {{ lastYear ? lastYear : '-' }}
                    {{ source.name === "average" ? (lastYear ? "%" : "") : "" }}
                </span>
            </div>
            <div class="widget--percent">
                <!-- <v-tooltip bottom v-if="source.name === 'portfolio'">
                    <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on" class="icon-warning">
                            <span class="percent--custom">PAI</span>
                        </div>
                    </template>
                    <span>
                        Property Asset Index<br />
                        Index = Current Year Est. Market Value / Purchase Price of Portfolio
                    </span>
                </v-tooltip>
                <v-tooltip bottom v-if="source.name === 'portfolio'">
                    <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on" class="icon-warning">
                            <img :src="require(`~/static/img/icon-${lastYearRate > 0 ? 'up' : 'down'}.svg`)" alt=""
                                v-if="lastYearRate" />
                            <span class="percent">{{ lastYearRate ? `${lastYearRate}%` : '-' }}</span>
                        </div>
                    </template>
                    <span>Compared to the current portfolio price</span>
                </v-tooltip> -->
                <!-- <div v-else>
                    <img :src="require(`~/static/img/icon-${lastYearRate > 0 ? 'up' : 'down'}.svg`)" alt=""
                        v-if="lastYearRate" />
                    <span class="percent">{{ lastYearRate ? `${lastYearRate}%` : '-' }}</span>
                </div> -->
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
            default: () => null
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
        // console.log({ source: this.source })
        if (this.source && this.source.name === "portfolio") {
            this.currentYear = this.source?.estimatedPortfolioPriceCurrentYear
                ? convertNumberToCommas(this.source.estimatedPortfolioPriceCurrentYear)
                : 0
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
    display: flex;
}

.percent {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.2rem;
    text-align: right;
    color: #171717;

    &--custom {
        @extend .percent;
        font-weight: 700;
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

.widget-form {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.icon-warning {
    width: fit-content;
    font-size: 2rem;
    margin-left: 0.5rem;
    position: relative;
    z-index: 2;
}

@media only screen and (max-width: 768px) {
    .widget-header {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .widget-footer {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .widget--percent {
        margin-left: auto;
    }
}
</style>
