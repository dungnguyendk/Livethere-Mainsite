<template>
    <v-dialog v-model="openDialog" :width="sizeDialog" persistent>
        <DialogCardAddNewInventory @close="onClose()" :type="type">
            <template slot="formAddInventory">
                <DialogFormAddNewInventory />
            </template>
            <template slot="actions">
                <DialogActionAddNewInventory @close="onClose()" />
            </template>
        </DialogCardAddNewInventory>
    </v-dialog>
</template>

<script>
import DialogCardAddNewInventory from "./components/DialogCardAddNewInventory"
import DialogFormAddNewInventory from "./Form/DialogFormAddNewInventory"
import DialogActionAddNewInventory from "./Form/DialogActionAddNewInventory"
export default {
    name: "AddNewInventoryDialog",
    components: { DialogCardAddNewInventory, DialogFormAddNewInventory, DialogActionAddNewInventory },
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
            openDialog: false
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
    },
    watch: {
        open(val) {
            this.openDialog = val
        }
    }
}
</script>
<style lang="scss" scoped>
:deep(.v-dialog) {
    box-shadow: 0px 34px 100px alpha(var(--color-gray), 0.18);
    border-radius: 1.6rem;
    background-color: #fff;
}
</style>
