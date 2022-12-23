<template lang="html">
    <form class="form--landlord form--add-unit-inventory">
        <div class="form__fields">
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Name </label>
                        <v-text-field v-model="name" dense outlined />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Conditions </label>
                        <v-select
                            v-model="condition"
                            :items="conditions"
                            placeholder="Please select"
                            dense
                            outlined
                        />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Quantity </label>
                        <v-text-field v-model="quantity" dense outlined />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Value </label>
                        <v-text-field v-model="value" dense outlined />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                    <div class="form__field">
                        <label>Remark </label>
                        <v-textarea v-model="remark" dense outlined />
                    </div>
                </v-col>
            </v-row>
        </div>
        <div class="form__actions">
            <v-btn class="btn btn--ghost btn--gray btn--sm" @click="onClose"> Cancel</v-btn>
            <v-btn class="btn btn--primary btn--green btn--sm"> Create</v-btn>
        </div>
    </form>
</template>

<script>
export default {
    name: "AddUnitInventoryForm",
    data() {
        return {
            name: "",
            condition: "",
            quantity: 0,
            value: "",
            remark: "",
            conditions: [
                {
                    text: "New",
                    value: "new"
                },
                {
                    text: "Used",
                    value: "used"
                }
            ]
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
.form--add-unit-inventory {
    .form__actions {
        display: flex;
        justify-content: center;
        align-items: center;
        grid-gap: 1.2rem;
        gap: 1.2rem;

        .btn {
            min-width: 12rem;
        }
    }
}
</style>
