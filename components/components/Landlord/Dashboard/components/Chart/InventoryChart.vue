<template lang="html">
    <div class="section-chart">
        <label class="chart-title">Inventory</label>
        <div class="section__columns">
            <div class="section__column">
                <div class="progress" :data-percentage="total">
                    <span class="progress-left">
                        <span class="progress-bar"></span>
                    </span>
                    <span class="progress-right">
                        <span class="progress-bar"></span>
                    </span>
                    <div class="progress-value">
                        <div>
                            <span>
                                {{ dashboard? dashboard.totalInventories : 0 }}
                            </span>
                        </div>
                    </div>
                </div>
                <!-- <div class="chart-box">
                    <Doughnut :chart-options="chartOptionsDoughnut" :chart-data="chartDataDoughnut"
                        :plugins="pluginsDoughnut" />
                </div> -->

                <label class="name-progress">Total</label>
            </div>
            <!-- <Doughnut :chart-options="chartOptionsDoughnut" :chart-data="chartDataDoughnut"
                :plugins="pluginsDoughnut" /> -->
            <div class="section__column">
                <div class="progress progress--blue" :data-percentage="tenant">
                    <span class="progress-left">
                        <span class="progress-bar progress-bar--blue"></span>
                    </span>
                    <span class="progress-right">
                        <span class="progress-bar progress-bar--blue"></span>
                    </span>
                    <div class="progress-value progress-value--blue">
                        <div>
                            <span>
                                {{ dashboard? dashboard.tenantInventories : 0 }}
                            </span>
                        </div>
                    </div>
                </div>
                <label class="name-progress">Tenanted</label>
            </div>
            <div class="section__column">
                <div class="progress progress--orange" :data-percentage="vacant">
                    <span class="progress-left">
                        <span class="progress-bar progress-bar--orange"></span>
                    </span>
                    <span class="progress-right">
                        <span class="progress-bar progress-bar--orange"></span>
                    </span>
                    <div class="progress-value progress-value--orange">
                        <div>
                            <span>{{ dashboard? dashboard.vacantInventories : 0 }}</span>
                        </div>
                    </div>
                </div>
                <label class="name-progress">Vacant</label>
            </div>
        </div>
    </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from "chart.js";
import { mapState } from "vuex"
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

export default {
    name: "InventoryChart",
    props: {
        chartId: {
            type: String,
            default: 'doughnut-chart-total'
        },
        datasetIdKey: {
            type: String,
            default: 'label-total'
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
                aspectRatio: 1,
                responsive: true,
                plugins:
                {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    },
                }
            },
            pluginsDoughnut: [
                {
                    beforeDraw(chart, args, options) {
                        const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { r } } = chart;
                        ctx.save()
                        const xCoor = chart.getDatasetMeta(0).data[0].x;
                        const yCoor = chart.getDatasetMeta(0).data[0].y;
                        const score = data.datasets[0].data[0]
                        console.log(yCoor);
                        ctx.font = '20px sans-serif'
                        // ctx.textBaseLine = "middle"
                        ctx.textAlign = "center"
                        ctx.fillStyle = '#27A857'
                        ctx.fillText(score, xCoor, yCoor)
                        // ctx.fillRect(xCoor, yCoor, 10, 10)
                        // ctx.font = '20px sans-serif'
                        // ctx.textAlign = "center"
                        // ctx.textBaseLine = "middle"
                        // ctx.fillStyle = '#27A857'
                        // ctx.fillText('97%', width / 2, top + (height / 2) + 5)
                        // ctx.textAlign = "center"
                        // ctx.textBaseLine = "middle"
                        // ctx.font = '20px sans-serif'

                        // const text = data.datasets[0].data[0]
                        // const textWidth = ctx.measureText(text).width
                        // const x = chart.getDatasetMeta(0).data[0].x;
                        // const y = chart.getDatasetMeta(0).data[0].y;
                        // ctx.fillText(text, x, y)
                    }
                },
            ]
        }
    },
    computed: {
        ...mapState({
            dashboard: (state) => state.dashboard.dashBoards
        }),
        total() {
            return this.dashboard
                ? (this.dashboard.totalInventories / this.dashboard.totalInventories) * 100
                : 0
        },
        tenant() {
            return this.dashboard
                ? (
                    (this.dashboard.tenantInventories / this.dashboard.totalInventories) *
                    100
                ).toFixed()
                : 0
        },
        vacant() {
            return this.dashboard
                ? (
                    (this.dashboard.vacantInventories / this.dashboard.totalInventories) *
                    100
                ).toFixed()
                : 0
        },
        chartDataDoughnut() {
            let chartDataDoughnut = {
                labels: [],
                datasets: [{
                    label: [],
                    data: [this.dashboard.totalInventories],
                    backgroundColor: ["#27A857"],
                    hoverBackgroundColor: ["#27A857"],
                    borderWidth: 0,
                    cutout: "80%",
                    borderRadius: 5
                }],
            }
            return chartDataDoughnut
        },
    },
    mounted() {
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
.section-chart {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.6rem;
    background: var(--color-white);
    box-shadow: 0px 9px 50px rgba(56, 56, 56, 0.1);
    border-radius: 2rem;
    min-height: 20rem;

    .section__column {
        label {
            text-align: center;
            width: 100%;
        }
    }

    .section__columns {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-gap: 2.4rem;
    }
}

.chart-title {
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.2rem;
    color: var(--color-title-black);
}

.chart-box {
    width: 7rem !important;
    height: 7rem !important;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    // display: contents;
}

.name-progress {
    padding: 1rem 0;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: #171717;
    margin-bottom: 0;
}
</style>
