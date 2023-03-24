<template lang="html">
    <tr>
        <td data-title="Tenancy Name">
            <p>{{ source.tenancyName ? source.tenancyName : "-" }}</p>
        </td>
        <td data-title="ID / Passport No.">
            <p>{{ source.tenancyIdentityDocNo ? source.tenancyIdentityDocNo : "-" }}</p>
        </td>
        <td data-title="Leasing Type">
            <p>{{ source.leasingTypeDisplay ? source.leasingTypeDisplay : "-" }} </p>
        </td>
        <td data-title="Company Name">
            <p>{{ source.companyName ? source.companyName : "-" }}</p>
        </td>
        <td data-title="Company Name">
            <div>
                <v-btn class="btn btn--outline btn--sm btn--green" @click.prevent="onEdit">
                    Edit
                </v-btn>
                <v-btn class="btn btn--primary btn--sm btn--red" @click.prevent="onDelete">
                    Delete</v-btn
                >
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    name: "TenacyInfoRecord",
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        onDelete() {
            this.$emit("onDelete", this.source)
        },
        onEdit() {
            this.$emit("onEdit", this.source)
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
        /* Body/Nunito-R/16-24 */
        margin-bottom: 0;
        font-family: var(--font-primary);
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        // line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: #0b0c0c;
    }
}

tr:nth-child(even) {
    background: #fafafa;
}

@media screen and (max-width: 768px) {
    tr:nth-child(even) {
        background: #fafafa;
    }

    td[data-title] {
        display: grid;
        justify-content: space-between;
        align-items: center;
        text-align: right;
        grid-template-columns: 1fr 1fr;
        grid-gap: 3rem;
        padding: 1.6rem;
        border-style: none;

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
