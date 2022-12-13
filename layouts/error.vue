<template>
    <v-app>
        <section class="page page--error">
            <div class="page__header">
                <template v-if="error.statusCode === 404">
                    <h1>{{ error.statusCode }}</h1>
                    <p>{{ pageNotFound }}</p>
                </template>
                <template v-else>
                    <h1>{{ error.statusCode }}</h1>
                    <p>{{ otherError }}</p>
                </template>
                <NuxtLink to="/" class="btn btn--primary btn--green btn--custom">
                    Back to homepage
                </NuxtLink>
            </div>
            <div class="page__content">
                <img src="~/static/img/error-img.jpg" alt="error-message" />
            </div>
        </section>
    </v-app>
</template>

<script>
export default {
    layout: "empty",
    props: {
        error: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            pageNotFound: "Page not found",
            otherError: this.error.message,
            title: ""
        }
    },
    mounted() {
        console.log(this.error)
    }
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
            font-size: 8rem;
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
