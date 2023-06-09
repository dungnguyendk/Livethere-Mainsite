<template lang="html">
    <tr>
        <td data-title="Date">
            <p>{{ purchaseDate }} </p>
        </td>
        <td data-title="Category">
            <p>{{ source.expenseTypeName || "n/a" }}</p>
        </td>
        <td data-title="Description">
            <p>{{ source.remark || "n/a" }}</p>
        </td>
        <td data-title="Price">
            <p>{{ source.currencyType === "SGD" && "S$" }} {{ price }}</p>
        </td>
        <td data-title="Action">
            <div class="actions">
                <v-btn class="btn btn--outline btn--sm btn--green" @click="onEdit">Edit</v-btn>
                <v-btn class="btn btn--ghost btn--sm btn--red" @click="onDelete">Delete</v-btn>
            </div>
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
            return this.source.purchaseDate
                ? this.$moment(this.source.purchaseDate).format("DD-MMM-YYYY")
                : "n/a"
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
            this.$emit("open", { open: (this.isOpenDeleteDialog = true), id: this.source.id })
        },
        onEdit() {
            this.$emit("onEdit", this.source)
        }
    }
}
</script>
<style lang="scss" scoped>
.actions {
    display: flex;
    justify-content: flex-end;
    grid-gap: 0.4rem;
    gap: 0.4rem;
}

tr {
    position: relative;
    vertical-align: top;
}

td {
    padding: 3.3rem 2.4rem;

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
