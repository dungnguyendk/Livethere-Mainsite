<template lang="html">
    <tr>
        <td data-title="Tenancy Name">
            <p>{{ source.name }}</p>
        </td>
        <td data-title="ID / Passport No."
            ><p>{{ source.passportNo }}</p></td
        >
        <td data-title="Leasing Type"
            ><p class="address">{{ source.leasingType }} </p></td
        >
        <td data-title="Uploaded Date"
            ><p>{{ source.uploadedDate }}</p>
        </td>
    </tr>
</template>

<script>
export default {
    name: "TenancyDocumentRecord",
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
    padding: 3.3rem 2.4rem;
    border-bottom: 1px solid #e5e5e5;
    p {
        display: flex;
        justify-content: left;
        margin-bottom: 0;
        font-family: var( --font-primary);
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #0b0c0c;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
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
