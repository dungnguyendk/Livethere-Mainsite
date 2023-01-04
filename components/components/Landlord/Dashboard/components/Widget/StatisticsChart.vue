<template lang="html">
    <div class="section__widget">
        <div class="widget-header">
            <div class="widget--content">
                <span class="widget-title">{{ source.headerTitle }}</span>
                <span class="price">{{ source.headerNumber }}</span>
            </div>
            <div class="widget--percent">
                <div class="svg-header">
                    <img :src="require(`~/static/img/${source.widgetSVG}.svg`)" alt="">
                </div>
                <img src="~/static/img/icon-up.png" alt="">
                <span class="percent">{{ source.headerPercent }}</span>
            </div>
        </div>
        <div class="widget-footer">
            <div class="widget--content">
                <span class="widget-title">{{ source.footerTitle }}</span>
                <span class="price">{{ source.footerNumber }}</span>
            </div>
            <div class="widget--percent">
                <img src="~/static/img/icon-up.png" alt="">
                <span class="percent">{{ source.footerPercent }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "StatisticsChart",
    props: {
        source: {
            type: Object,
            default: () => { }
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
    border-bottom: 1px solid #E5E5E5;
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

    .percent {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2.2rem;
        text-align: right;
        color: #171717;
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
</style>