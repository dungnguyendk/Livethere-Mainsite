<template lang="html">
    <div class="card--content">
        <div class="card__top">
            <h4>{{ title }}</h4>
        </div>
        <div class="card__container">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: "ContentCard",
    props: {
        title: {
            type: String,
            default: "Name"
        }
    }
}
</script>
<style lang="scss" scoped>
.card--content {
    border-radius: 0.8rem;
    overflow: hidden;
    background-color: var(--color-bg-gray);
    border: 1px solid var(--color-bg-gray);

    .card__top {
        position: relative;
        height: 4.8rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 1.2rem;

        h4 {
            margin-bottom: 0;
            font-size: 1.4rem;
            font-weight: 500;
            color: var(--color-heading);
        }
    }

    .card__container {
        padding: 2.4rem 1.2rem;
        background-color: #fff;
    }
}
</style>
