<template lang="html">
    <div class="section-chart">
        <label class="chart-title">Inventory</label>
        <div class="section__columns">
            <div class="section__column">
                <div class="chart-box">
                    <Doughnut :chart-options="chartOptionsDoughnut" :chart-data="chartDataDoughnut"
                        :plugins="pluginsDoughnut" />
                </div>
                <label class="name-progress">Total</label>
            </div>
            <div class="section__column">
                <div class="chart-box">
                    <Doughnut :chart-options="chartOptionsDoughnutTenanted" :chart-data="chartDataDoughnutTenanted"
                        :plugins="pluginsDoughnutTenanted" />
                </div>
                <label class="name-progress">Tenanted</label>
            </div>
            <div class="section__column">
                <div class="chart-box">
                    <Doughnut :chart-options="chartOptionsDoughnutVacant" :chart-data="chartDataDoughnutVacant"
                        :plugins="pluginsDoughnutVacant" />
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
                    pluginsDoughnut: {
                        fontWeight: 700,
                        fontColor: '#27A857',
                        fontSize: 20,
                        fontFamily: 'sans-serif'
                    }
                }
            },
            chartOptionsDoughnutTenanted: {
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
                    pluginsDoughnut: {
                        fontWeight: 700,
                        fontColor: '#5D5FEF',
                        fontSize: 20,
                        fontFamily: 'sans-serif'
                    }
                }
            },
            chartOptionsDoughnutVacant: {
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
                    pluginsDoughnut: {
                        fontWeight: 700,
                        fontColor: '#FF9A3E',
                        fontSize: 20,
                        fontFamily: 'sans-serif'
                    }
                }
            },
            pluginsDoughnut: [
                {
                    id: 'pluginsDoughnut',
                    beforeDraw(chart, args, options) {
                        const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { r } } = chart;
                        ctx.save()
                        const score = data.datasets[0].data[0]
                        ctx.font = options.fontWeight + ' ' + options.fontSize + 'px ' + options.fontFamily
                        ctx.textAlign = "center"
                        ctx.fillStyle = options.fontColor
                        ctx.fillText(score, width / 2, (height / 2) + (options.fontSize * 0.34))
                    }
                },
            ],
            pluginsDoughnutTenanted: [
                {
                    id: 'pluginsDoughnut',
                    beforeDraw(chart, args, options) {
                        const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { r } } = chart;
                        ctx.save()
                        const score = data.datasets[0].data[0]
                        ctx.font = options.fontWeight + ' ' + options.fontSize + 'px ' + options.fontFamily
                        ctx.textAlign = "center"
                        ctx.fillStyle = options.fontColor
                        ctx.fillText(score, width / 2, (height / 2) + (options.fontSize * 0.34))
                    }
                },
            ],
            pluginsDoughnutVacant: [
                {
                    id: 'pluginsDoughnut',
                    beforeDraw(chart, args, options) {
                        const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { r } } = chart;
                        ctx.save()
                        const score = data.datasets[0].data[0]
                        ctx.font = options.fontWeight + ' ' + options.fontSize + 'px ' + options.fontFamily
                        ctx.textAlign = "center"
                        ctx.fillStyle = options.fontColor
                        ctx.fillText(score, width / 2, (height / 2) + (options.fontSize * 0.34))
                    }
                },
            ],
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
                    data: [this.dashboard.totalInventories, this.dashboard.totalInventories === 0 ? value : null],
                    backgroundColor: ["#27A857", this.dashboard.totalInventories === 0 ? "hsla(142, 62%, 90%, 1)" : null],
                    hoverBackgroundColor: ["#27A857", this.dashboard.totalInventories === 0 ? "hsla(142, 62%, 90%, 1)" : null],
                    borderWidth: 0,
                    cutout: "80%",
                }],
            }
            return chartDataDoughnut
        },
        chartDataDoughnutTenanted() {
            const value = 100
            let chartDataDoughnut = {
                labels: [],
                datasets: [{
                    label: [],
                    data: [this.dashboard.tenantInventories, this.dashboard.totalInventories - this.dashboard.tenantInventories, this.dashboard.tenantInventories === 0 ? value : null],
                    backgroundColor: ["#5D5FEF", "hsla(240, 83%, 93%, 1)", this.dashboard.tenantInventories === 0 ? "hsla(240, 83%, 93%, 1)" : null],
                    hoverBackgroundColor: ["#5D5FEF", "hsla(240, 83%, 93%, 1)", this.dashboard.tenantInventories === 0 ? "hsla(240, 83%, 93%, 1)" : null],
                    borderWidth: 0,
                    cutout: "80%",
                    borderRadius: (this.dashboard.totalInventories - this.dashboard.tenantInventories === 0) || this.dashboard.tenantInventories === 0 ? 0 : [5, -5]
                }],
            }
            return chartDataDoughnut
        },
        chartDataDoughnutVacant() {
            const value = 100
            let chartDataDoughnut = {
                labels: [],
                datasets: [{
                    label: [],
                    data: [this.dashboard.vacantInventories, this.dashboard.totalInventories - this.dashboard.vacantInventories, this.dashboard.vacantInventories === 0 ? value : null],
                    backgroundColor: ["#FF9A3E", "hsla(29, 100%, 92%, 1)", this.dashboard.vacantInventories === 0 ? "hsla(29, 100%, 92%, 1)" : null],
                    hoverBackgroundColor: ["#FF9A3E", "hsla(29, 100%, 92%, 1)", this.dashboard.vacantInventories === 0 ? "hsla(29, 100%, 92%, 1)" : null],
                    borderWidth: 0,
                    cutout: "80%",
                    borderRadius: (this.dashboard.totalInventories - this.dashboard.vacantInventories === 0) || this.dashboard.vacantInventories === 0 ? 0 : [5, -5]
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
