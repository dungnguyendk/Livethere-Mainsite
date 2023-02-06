<template lang="html">
    <div class="box">
        <div class="box__top">
            <div class="box__icon">
                <i class="ri-stop-circle-line"></i>
            </div>
        </div>
        <div class="box__container">
            <!--            <div class="box__content">
                <h4>{{ title }}</h4>
                <p>
                    {{ description }}
                </p>
            </div>-->
            <!--            <div class="box__actions">
                <v-btn class="btn btn&#45;&#45;ghost btn&#45;&#45;gray btn&#45;&#45;sm" @click="onClose">Cancel</v-btn>
                <v-btn class="btn btn&#45;&#45;primary btn&#45;&#45;red btn&#45;&#45;sm" @click="onSubmit">Confirm</v-btn>
            </div>-->
        </div>
    </div>
</template>

<script>
export default {
    name: "ConfirmBox",
    /* props: {
        title: {
            type: String,
            default: () => "Confirm"
        },
        description: {
            type: String,
            default: () => " Are you sure you want do this action? This action can not be undone."
        }
    },*/
    methods: {
        /*  onClose() {
            this.$emit("close")
        },
        onSubmit() {
            this.$emit("submit")
        }*/
    }
}
</script>

<style lang="scss" scoped>
/*.box {
    .box__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 6.4rem;
        height: 6.4rem;
        border-radius: 50%;
        background-color: var(--color-red);
    }
}*/
</style>
