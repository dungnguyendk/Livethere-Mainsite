<template>
    <v-dialog v-model="openDialog" :width="sizeDialog" persistent   :content-class="`${customClass && 'v-dialog-v2'}`">
        <DialogCard :title="title" @close="onClose" :actions="actions">
            <slot />
            <template slot="content">
                <slot name="content" />
            </template>
            <template slot="actions">
                <slot name="actions"></slot>
            </template>
        </DialogCard>
    </v-dialog>
</template>

<script>
import DialogCard from "./components/DialogCard"

export default {
    name: "Dialog",
    components: {
        DialogCard
    },
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
        },
        title: {
            type: String,
            default: "Default Dialog"
        },
        actions: {
            type: Boolean,
            default: true
        },
        customClass: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        sizeDialog() {
            if (this.size === "small") return 480
            if (this.size === "medium") return 640
            if (this.size === "large") return 830
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
.v-dialog {
    box-shadow: 0px 34px 100px rgba(69, 77, 104, 0.18);
    border-radius: 1.6rem;
    background-color: var(--color-white);
    &.v-dialog--fullscreen {
        border-radius: 0;
    }
}

.btn-group {
    flex-flow: row nowrap;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    grid-gap: 1.2rem;
    gap: 1.2rem;

    .btn {
        max-width: 12rem;
    }
}

.v-text-field {
    .v-text-field--enclosed {
        .v-text-field__details {
            display: none !important;
        }
    }
}
.v-dialog-v2 {
    .card--dialog {
        .card__header {
            justify-content: center;
            padding-top: 3.2rem;
            padding-bottom: 2.4rem;
            position: relative;
            h4 {
                font-size: 2.4rem;
            }
        }
        .btn--close {
            box-shadow: none;
            width: 2.667rem;
            height: 2.667rem;
            border: 1.5px solid var(--color-label);
            position: absolute;
            top: 2rem;
            right: 3.2rem;
            left: auto;
            i {
                font-size: 2rem;
            }
        }
    }
    
}
</style>
