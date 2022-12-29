<template lang="html">
    <div class="section-chart">
        <label class="chart-title">Expiring Leases</label>
        <!-- <Pie :chart-options="chartOptions" chart-id="pie-chart" dataset-id-key="label" :width="400" :height="400" /> -->
    </div>
</template>

<script>
// import {
//     Chart as ChartJS,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     BarElement,
// } from "chart.js";

// ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);
export default {
    name: "ExpiringLeasesChart",
    data() {
        return {
            // chartOptions: {
            //     responsive: true,
            //     maintainAspectRatio: true,
            //     plugins: {
            //         legend: {
            //             position: "bottom",
            //         },
            //         tooltip: {
            //             callbacks: {
            //                 label: (tooltipItems, data) => {
            //                     return tooltipItems.label + ": $" + tooltipItems.formattedValue;
            //                 },
            //             },
            //         },
            //         title: {
            //             display: true,
            //             text: 'Based on submission data - YTD',
            //             align: 'center',
            //             position: 'bottom'
            //         }
            //     },
            // },
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
}

.chart-title {
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.2rem;
    color: var(--color-title-black);
}
</style>