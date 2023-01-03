<template lang="html">
    <div class="section-chart">
        <div class="block--header">
            <div class="block--header-form">
                <img :src="require(`~/static/img/${source.icon}.png`)" alt="">
                <div class="header-title">
                    <span class="income">Income {{ source.incomeYear }}</span>
                    <span class="price">SGD {{ source.price }}</span>
                </div>
            </div>
            <div :class="`growth growth--${source.colorPercent}`">
                <i class="ri-arrow-up-s-fill"></i>
                <span class="percent">0.5%</span>
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
        <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
            :dataset-id-key="datasetIdKey" class="chartjs-render-monitor" />

    </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement);
export default {
    name: "IncomeChart",
    props: {
        source: {
            type: Object,
            default: () => { }
        },
        lineColor: {
            type: String,
            default: () => "hsla(240, 64%, 62%, 1)"
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
            chartData: {
                labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                datasets: [{
                    label: [],
                    data: [2, 10, 5, 9, 0, 6, 20, 10, 12, 15, 22, 11],
                    backgroundColor: "hsla(240, 64%, 62%, 1)",
                    borderColor: "hsla(240, 64%, 62%, 1)",
                    fill: false,
                    lineTension: 0.4
                }],

            },
            chartOptions: {
                aspectRatio: 3.5,
                elements: {
                    point: {
                        radius: 3
                    }
                },
                plugins: {
                    title: {
                        display: false,
                    },
                    legend: {
                        display: false
                    },
                    // tooltip: {
                    //     enabled: false
                    // }
                },
                scales: {
                    x: {
                        display: false,
                        scaleLabel: {
                            display: false,
                        },
                    },
                    y: {
                        display: false,
                        scaleLabel: {
                            display: true,
                        },
                        ticks: {
                            min: 0,
                            max: 50,
                            stepSize: 10
                        }
                    }
                }
            },
        }
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