<template lang="html">
    <div class="section-chart">
        <div class="block--header">
            <div class="block--header-form">
                <img :src="require(`~/static/img/${source.icon}.png`)" alt="">
                <div class="header-title">
                    <span class="income">Income {{ source.incomeYear }}</span>
                    <span class="price">SGD {{ priceFormat }}</span>
                </div>
            </div>
            <div :class="`growth growth--${source.incomeRate < 0 ? 'red' : 'green'}`"
                v-if="source.name === 'Current year' && source.incomeRate">
                <i :class="`ri-arrow-${source.incomeRate < 0 ? 'down' : 'up'}-s-fill`"></i>
                <span class="percent">{{ source.incomeRate ? `${source.incomeRate}%` : '-' }}</span>
            </div>
        </div>
        <!-- <img :src="require(`~/static/img/${source.img}.png`)" alt="" class="chart-line"> -->
        <div class="chartjs-size-monitor">
            <div class="chartjs-size-monitor-expand">
                <div class=""></div>
            </div>
            <div class="chartjs-size-monitor-shrink">
                <div class=""></div>
            </div>
        </div>
        <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
            class="chartjs-render-monitor" />

    </div>
</template>

<script>
import { convertNumberToCommas } from "~/ultilities/helpers"
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement);
export default {
    name: "IncomeChart",
    props: {
        source: {
            type: Object,
            default: () => { }
        },
        chartId: {
            type: String,
            default: 'doughnut-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 400
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => { }
        },
        plugins: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            chartOptions: {
                aspectRatio: 3.5,
                elements: {
                    // point: {
                    //     radius: 3
                    // }
                },
                plugins: {
                    title: {
                        display: false,
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        // enabled: false
                        callbacks: {
                            label: (tooltipItems, data) => {
                                return tooltipItems.label + ": $" + tooltipItems.formattedValue;
                            },
                        },
                    }
                },
                scales: {
                    x: {
                        display: true,
                        scaleLabel: {
                            display: false,
                        },
                    },
                    y: {
                        display: true,
                        scaleLabel: {
                            display: false,
                        },
                        ticks: {
                            min: 0,
                            max: 100000,
                            stepSize: 10000
                        }
                    }
                }
            },
        }
    },
    computed: {
        chartData() {
            let chartData = {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: [],
                    data: [],
                    backgroundColor: this.source ? this.source.lineColor : [],
                    borderColor: this.source ? this.source.lineColor : [],
                    fill: false,
                    lineTension: 0.3
                }],
            }
            chartData.datasets[0].data = this.source.data
            // chartData.datasets[0].backgroundColor = this.source.checkBackgroundColor
            // chartData.labels = this.source.labels
            return chartData
        },
        priceFormat() {
            return convertNumberToCommas(this.source.price)
        }
    },
    created() {
        // console.log("this.source::", this.source)
    }
}
</script>
<style lang="scss" scoped>
.section-chart {
    padding: 1.6rem;
    background: var(--color-white);
    box-shadow: 0px 9px 50px rgba(56, 56, 56, 0.1);
    border-radius: 2rem;
    min-height: 20rem;

    .chart-line {
        width: 100%;
        margin-top: 1.6rem;
    }
}

.block--header {
    display: flex;
    justify-content: space-between;

    &-form {
        display: flex;
        gap: 1rem
    }

    img {
        width: 3.4rem;
        height: 3.4rem;
    }
}

.header-title {
    display: flex;
    flex-direction: column;

    .income {
        color: #737373;
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
    }

    .price {
        font-weight: 700;
        font-size: 20px;
        line-height: 27px;
        color: #171717;
    }
}

.growth {
    display: flex;
    flex-direction: column;
    align-items: center;

    &--red {
        color: #FF4A55;
    }

    &--green {
        color: #27A857;
    }
}
</style>