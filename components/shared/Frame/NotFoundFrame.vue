<template lang="html">
    <section class="page page--error">
        <div class="page__header">
            <h1>Page not found!</h1>
        </div>
        <div class="page__content">
            <img src="~/static/img/error-img.jpg" alt="error-message" />
        </div>
    </section>
</template>

<script>
export default {
    name: "NotFoundFrame"
}
</script>

<style lang="scss" scoped>
.page--error {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20.5rem;
    .page__header {
        h1 {
            font-size: 6rem;
            font-weight: 700;
            line-height: 9.28rem;
            color: var(--color-heading);
            text-align: center;
        }
        p {
            text-align: center;
            font-weight: 600;
            font-size: 3.2rem;
            line-height: 5.248rem;
            color: alpha(var(--color-gray), var(--level-3));
        }
    }
    .page__content {
    }
}
.btn--custom {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
