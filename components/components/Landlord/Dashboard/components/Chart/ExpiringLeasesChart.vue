<template lang="html">
    <div class="section-chart">
        <label class="chart-title">Expiring Leases</label>
        <Doughnut :chart-options="chartOptionsDoughnut" :chart-data="chartDataDoughnut" :plugins="pluginsDoughnut"
            :chart-id="chartId" :dataset-id-key="datasetIdKey" />
        <div class="block__leases">
            <div class="leases-day">
                <div class="expiring">
                    <div class="leases leases--color-orange"></div>
                    <span>{{ dashboard? dashboard.expiringLeaseStage1 : 0 }}</span>
                </div>
                <label>&lt30 days</label>
            </div>
            <div class="leases-day">
                <div class="expiring">
                    <div class="leases leases--color-blue"></div>
                    <span>{{ dashboard? dashboard.expiringLeaseStage2 : 0 }}</span>
                </div>
                <label>31 - 90 days</label>
            </div>
            <div class="leases-day">
                <div class="expiring">
                    <div class="leases leases--color-green"></div>
                    <span>{{ dashboard? dashboard.expiringLeaseStage3 : 0 }}</span>
                </div>
                <label>&gt 90 days</label>
            </div>
        </div>
    </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from "chart.js";
import { mapState } from "vuex"
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
            chartOptionsDoughnut: {
                maintainAspectRatio: false,
                aspectRatio: 3.5,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
            },
            pluginsDoughnut: [{
                afterDraw: function (chart, option) {
                    const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { r } } = chart
                    ctx.save()
                    const xCoor = chart.getDatasetMeta(0).data[0].x;
                    const yCoor = chart.getDatasetMeta(0).data[0].y;
                    const score = data.datasets[0].data[0] + data.datasets[0].data[1] + data.datasets[0].data[2]
                    // ctx.fillRect(xCoor, yCoor, 400, 1)
                    ctx.font = '20px sans-serif'
                    ctx.textBaseLine = "bottom"
                    ctx.textAlign = "center"
                    ctx.fillText(score, xCoor, yCoor - 20)

                    ctx.font = '15px sans-serif'
                    ctx.textBaseLine = "bottom"
                    ctx.textAlign = "center"
                    ctx.fillText("Properties", xCoor, yCoor - 4)
                }
            }]
        }
    },
    computed: {
        ...mapState({
            dashboard: (state) => state.dashboard.dashBoards
        }),
        chartDataDoughnut() {
            const value = 100
            let chartDataDoughnut = {
                labels: [],
                datasets: [{
                    label: [],
                    data: [],
                    backgroundColor: [
                        '#FF9A3E', '#5D5FEF', '#27A857', this.dashboard.expiringLeaseStage1 === 0 && this.dashboard.expiringLeaseStage2 === 0 && this.dashboard.expiringLeaseStage3 === 0 ? "hsla(142, 62%, 90%, 1)" : null
                    ],
                    borderWidth: 1,
                    cutout: "80%",
                    circumference: 180,
                    rotation: -90,
                }],
            }
            chartDataDoughnut.datasets[0].data = [this.dashboard.expiringLeaseStage1, this.dashboard.expiringLeaseStage2, this.dashboard.expiringLeaseStage3, this.dashboard.expiringLeaseStage1 === 0 && this.dashboard.expiringLeaseStage2 === 0 && this.dashboard.expiringLeaseStage3 === 0 ? value : null]
            return chartDataDoughnut
        },
    }
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