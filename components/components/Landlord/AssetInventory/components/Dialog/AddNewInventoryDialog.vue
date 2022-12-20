<template>
    <v-dialog v-model="openDialog" :width="sizeDialog" persistent>
        <DialogCardAddNewInventory @close="onClose()" :type="type">
            <template slot="formAddInventory">
                <DialogFormAddNewInventory @checkEmptyError="onCheckEmptyError" @close="onClose()" />
            </template>
        </DialogCardAddNewInventory>
    </v-dialog>
</template>

<script>
import DialogCardAddNewInventory from "./components/DialogCardAddNewInventory"
import DialogFormAddNewInventory from "./Form/DialogFormAddNewInventory"
export default {
    name: "AddNewInventoryDialog",
    components: { DialogCardAddNewInventory, DialogFormAddNewInventory },
    props: {
        open: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: "large"
        },
        title: {
            type: String,
            default: "Default Dialog"
        },
        type: {
            type: String,
            default: "full"
        }
    },
    data() {
        return {
            openDialog: false,
            isEmptyErrors: true,
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
        },
        onCheckEmptyError(val) {
            this.isEmptyErrors = !val
        }
    },
    watch: {
        open(val) {
            this.openDialog = val
        }
    }
}
</script>
<style lang="scss" scoped>
.card__footer {
    padding: 0 5rem 5rem 5rem;

    @media only screen and (max-width: 768px) {
        padding: 0 3rem 3rem 3rem;
    }
}

:deep(.v-dialog) {
    box-shadow: 0px 34px 100px alpha(var(--color-gray), 0.18);
    border-radius: 1.6rem;
    background-color: #fff;
}
</style>
