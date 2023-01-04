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
        <img :src="require(`~/static/img/${source.img}.png`)" alt="" class="chart-line">
    </div>
</template>

<script>
export default {
    name: "IncomeChart",
    props: {
        source: {
            type: Object,
            default: () => { }
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