<template lang="html">
    <div class="box">
        <div class="box__top">
            <div class="box__icon">
                <i :class="icon" />
            </div>
        </div>
        <div class="box__container">
            <div class="box__content">
                <h4>{{ title }}</h4>
                <p>
                    {{ description }}
                </p>
            </div>
            <div class="box__actions">
                <v-btn class="btn btn--ghost btn--gray btn--sm" @click="onClose">Cancel</v-btn>
                <v-btn class="btn btn--primary btn--red btn--sm" @click="onSubmit">
                    {{ btnLabel }}
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ConfirmBox",
    props: {
        title: {
            type: String,
            default: () => "Confirm?"
        },
        description: {
            type: String,
            default: () => " Are you sure you want do this action? This action can not be undone."
        },
        btnLabel: {
            type: String,
            default: () => "Confirm"
        },
        icon: {
            type: String,
            default: () => "ri-question-line"
        }
    },
    methods: {
        onClose() {
            this.$emit("close")
        },
        onSubmit() {
            this.$emit("submit")
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-gap: 1.2rem;
    gap: 1.2rem;
    padding: 2.4rem 0;
    .box__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 6.4rem;
        height: 6.4rem;
        border-radius: 50%;
        background-color: alpha(var(--color-red), 0.85);

        i {
            color: #fff;
            font-size: 3.2rem;
        }
    }

    .box__top {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box__content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column wrap;

        h4 {
            font-size: 2.4rem;
            font-weight: 700;
            margin-bottom: 0;
        }

        p {
            font-size: 1.4rem;
            font-weight: 400;
            color: var(--color-heading);
            text-align: center;
        }
    }

    .box__actions {
        display: flex;
        justify-content: center;
        align-items: center;
        grid-gap: 1.2rem;
        gap: 1.2rem;
        padding-top: 1.2rem;
    }

    .box__container {
    }
}
</style>
