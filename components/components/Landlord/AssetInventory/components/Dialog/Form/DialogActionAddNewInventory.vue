<template>
    <div class="btn-group">
        <v-btn class="btn btn--primary btn--green btn__add-file" @click="onClose()">
            Add
        </v-btn>
        <span class="cancel-form" @click="onClose()">
            Cancel
        </span>
    </div>
</template>
<script>
export default {
    name: "DialogActionAddNewInventory",
    data() {
        return {

        }
    },
    methods: {
        onClose() {
            this.$emit("close")
        }
    }
}
</script>
<style lang="scss" scoped>
.btn-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 2.6rem;

    .btn {
        max-width: 12rem;
        border-radius: 0.8rem !important;
    }

    .btn__add-file {
        min-width: 38rem !important;
    }

    .cancel-form {
        color: #00634F;
        text-decoration-line: underline;
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2rem;
        cursor: pointer;
    }

    .btn--green {
        &.v-btn--has-bg.v-btn--disabled {
            cursor: not-allowed;
        }
    }
}

.v-btn--disabled {
    pointer-events: auto;
}

@media only screen and (max-width: 768px) {
    .btn-group {
        .btn__add-file {
            min-width: auto !important;
            width: 100%;
            max-width: 100% !important;
        }
    }

}
</style>