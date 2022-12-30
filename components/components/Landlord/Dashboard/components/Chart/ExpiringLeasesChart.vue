<template lang="html">
    <div class="section-chart">
        <label class="chart-title">Expiring Leases</label>
        <!-- <Doughnut /> -->
        <div class="donut-chart">
            <img src="~/static/img/donut-chart.png" alt="">
        </div>
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
    data() {
        return {
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