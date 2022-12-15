<template lang="html">
    <tr>
        <td data-title="Tenancy Agreement Code"
            ><div>
                <a href="/#">{{ source.tenancyAgreementCode }}</a>
            </div></td
        >
        <td data-title="Agreement Date"
            ><p>{{ source.agreementDate }}</p></td
        >
        <td data-title="Address"
            ><p class="address">{{ source.startDate }} </p></td
        >
        <td data-title="Start Date"
            ><p>{{ source.endDate }}</p>
        </td>

        <td data-title="Ternant Name"
            ><p>{{ source.tenantName }}</p></td
        >
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
        /* 26A0F6 cyan */

        color: #26a0f6;
    }
    a:hover{
        color: #26a0f6;
        //text-decoration-line: underline;
    };
    p {
        display: flex;
        justify-content: left;
        /* Body/Nunito-R/16-24 */

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
