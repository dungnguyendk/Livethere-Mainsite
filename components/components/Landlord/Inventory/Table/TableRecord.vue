<template lang="html">
    <tr>
        <td data-title="Tenancy Agreement Code">
            <div>
                <nuxt-link :to="`/landlord/tenancy/details/${source.internalID}`">
                    {{ source.tenancyRefCode }}
                </nuxt-link>
            </div>
        </td>
        <td data-title="Agreement Date">
            <p>{{ formatAgreementDate }}</p></td
        >
        <td data-title="Start date"
            ><p>{{ formatStartDate }} </p></td
        >
        <td data-title="End Date"
            ><p>{{ formatEndDate }}</p>
            <p>{{ source.statusDisplay }}</p>
        </td>
        <!-- <td data-title="Remark">
            <p></p>
        </td> -->
    </tr>
</template>

<script>
export default {
    name: "TableRecord",
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        formatStartDate() {
            return this.$dayjs(this.source.startDate).format("DD-MMM-YYYY")
        },
        formatAgreementDate() {
            return this.$dayjs(this.source.agreementDate).format("DD-MMM-YYYY")
        },
        formatEndDate() {
            return this.$dayjs(this.source.endDate).format("DD-MMM-YYYY")
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
    padding: 3.3rem 1.8rem;
    border-bottom: 1px solid #e5e5e5;

    a {
        display: flex;
        justify-content: left;
        font-family: "Nunito";
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        text-decoration-line: underline;
        white-space: nowrap;
        margin-bottom: 0;
        color: #26a0f6;
    }

    a:hover {
        color: #26a0f6;
        //text-decoration-line: underline;
    }

    p {
        display: flex;
        justify-content: left;
        /* Body/Nunito-R/16-24 */
        margin: 0;
        font-family: "Nunito";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        /* identical to box height, or 150% */

        /* 0B0C0C paragraph txt */

        color: #0b0c0c;
    }
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
        border: none;
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
