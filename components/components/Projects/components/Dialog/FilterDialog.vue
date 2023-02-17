<template>
    <v-dialog v-model="openDialog" width="677" persistent>
        <div class="card--dialog">
            <div class="card__header">
                <div class="card__header-btn-close">
                    <button class="text">
                        <v-icon prepend-icon="icon-svg svg-close-circle"></v-icon>
                    </button>
                </div>
                <div class="card__header-title">
                    <h4>Filter</h4>
                </div>
            </div>
            <div class="card__content"></div>
            <div class="card__actions"></div>
        </div>
    </v-dialog>
</template>

<script>
export default {
    name: "FilterDialog",
    data() {
        return {
            openDialog: false
        }
    },
    props: {
        open: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: "medium" // small, medium, large
        }
    },
    methods: {
        onClose() {
            this.openDialog = false
            this.$emit("close")
        }
    },
    watch: {
        open(val) {
            this.openDialog = val
        }
    }
}
</script>

<style lang="scss">
.card--dialog {
    background: var(--color-white);
    border-radius: 2rem;
    .card__header {
        .card__header-btn-close {
            display: flex;
            justify-content: flex-end;
        }
        .card__header-title {
            h4 {
                font-weight: 700;
                font-size: 2rem;
                line-height: 2.7rem;
                text-align: center;
            }
        }
    }
}
</style>