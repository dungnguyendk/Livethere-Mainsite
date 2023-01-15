<template lang="html">
    <tr>
        <td data-title="Description">
            <p>{{ source.itemName }}</p>
        </td>
        <td data-title="Price">
            <p>{{ source.currencyType }} {{ price }}</p>
        </td>
        <td data-title="Date">
            <p>{{ purchaseDate }} </p>
        </td>
        <td data-title="Actions">
            <v-btn class="btn btn--ghost btn--sm btn--red" @click="onDelete"> Delete</v-btn>

        </td>
    </tr>
</template>

<script>
import { convertNumberToCommas } from "~/ultilities/helpers"
import SuccessSnackBar from "~/components/shared/Snackbar/SuccessSnackBar"

export default {
    name: "TenacyExpenseRecord",
    components: { SuccessSnackBar },
    computed: {
        price() {
            return convertNumberToCommas(this.source.itemPrice)
        },
        purchaseDate() {
            return this.$moment(this.source.purchaseDate).format("DD-MMM-YYYY")
        }
    },
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            snackBar: false,
            snackBarMessage: "Delete tenancy expense successfully!",
            isOpenDeleteDialog: false
        }
    },
    methods: {
        onDelete() {
            this.$emit("open", {open: this.isOpenDeleteDialog = true, id: this.source.id})
        }
    }
}
</script>
<style lang="scss" scoped>
tr {
    position: relative;
    vertical-align: top;
}

td {
    padding: 3.3rem 2.4rem;
    border-bottom: 1px solid #e5e5e5;

    p {
        display: flex;
        justify-content: left;
        margin-bottom: 0;
        font-family: var(--font-primary);
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;

        color: #0b0c0c;
    }
}

td:nth-child(2) {
    padding-left: 0;
}
td:nth-child(4) {
    display: flex;
    justify-content: flex-end;
}

tr:nth-child(even) {
    background-color: #fafafa;
}

@media screen and (max-width: 768px) {
    tr:nth-child(even) {
        background-color: #fafafa;
    }
    td[data-title] {
        display: grid;
        justify-content: space-between;
        align-items: center;
        text-align: right;
        grid-template-columns: 1fr 1fr;
        grid-gap: 3rem;
        padding: 1.6rem;
        border-top: none;

        &:before {
            content: attr(data-title);
            font-weight: 700;
            color: #0b0c0c;
            font-size: 1.6rem;
            text-align: left;
        }
    }
}
</style>
