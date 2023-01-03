<template lang="html">
    <div class="section-chart">
        <label class="chart-title">Expiring Leases</label>
        <Doughnut :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
            :dataset-id-key="datasetIdKey" />
        <!-- <div class="donut-chart">
            <img src="~/static/img/donut-chart.png" alt="">
        </div> -->
        <div class="block__leases">
            <div class="leases-day">
                <div class="expiring">
                    <div class="leases leases--color-orange"></div>
                    <span>2</span>
                </div>
                <label>&lt30 days</label>
            </div>
            <div class="leases-day">
                <div class="expiring">
                    <div class="leases leases--color-blue"></div>
                    <span>2</span>
                </div>
                <label>31 - 60 days</label>
            </div>
            <div class="leases-day">
                <div class="expiring">
                    <div class="leases leases--color-green"></div>
                    <span>4</span>
                </div>
                <label>61 - 90 days</label>
            </div>
        </div>
    </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);
export default {
    name: "ExpiringLeasesChart",
    props: {
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
                labels: [],
                datasets: [
                    {
                        backgroundColor: ['#FF9A3E', '#5D5FEF', '#27A857'],
                        data: [2, 2, 4]
                    }
                ],
                afterDraw: function (chart, args, pluginOptions) {
                    const { ctx, chartArea: { top, right, bottom, left, width, height } } = chart;
                    ctx.save();
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.font = "16px normal 'Helvetica Nueue'";
                    ctx.fillText('No data to display', width / 2, height / 2);
                }
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 3.5,
                cutout: "80%",
                circumference: 180,
                rotation: -90,
                // plugins: [this.gaugeChartText]
                // title: {
                //     display: true,
                //     text: 'Based on submission data - YTD',
                //     align: 'center',
                //     position: 'bottom'
                // },

                // },
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.section-chart {
    padding: 1.6rem;
    background: var(--color-white);
    box-shadow: 0px 9px 50px rgba(56, 56, 56, 0.1);
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 20rem;
}

.donut-chart {
    text-align: center;
    height: 6.5rem;
    width: 100%;
    margin-bottom: 2rem;

}

.chart-title {
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.2rem;
    color: var(--color-title-black);
}

.expiring {
    display: flex;
    align-items: center;
    gap: 0.4rem;

    span {
        color: #171717;
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 1.6rem;
    }
}

.block__leases {
    display: flex;
    justify-content: space-between;
}

.leases-day {
    label {
        color: #737373;
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 1.6rem;
    }
}

.leases {
    width: 8px;
    height: 8px;
    border-radius: 3px;

    &--color-orange {
        background: #FF9A3E;
    }

    &--color-blue {
        background: #5D5FEF;
    }

    &--color-green {
        background: #27A857;
    }
}
</style>