<template lang="html">
    <div class="container">
        <div class="box--tenacy-document">
            <div class="section__top">
                <h3 class="section__top--title"> Tenancy Documents </h3>
            </div>
            <TenancyDocumentTable />
        </div>
    </div>
</template>

<script>
import TenancyDocumentTable from "./Table/TenancyDocument/TenancyDocumentTable.vue"
export default {
    name: "TenancyDocuments",
    components: { TenancyDocumentTable }
}
</script>
<style lang="scss" scoped>
.container {
    padding-top: 2.4rem;
}
.box--tenacy-document {
    padding-bottom: 5rem;
    background-color: var(--color-white);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 20px;

    .section__top {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .section__top--title {
            padding: 2.6rem 2.4rem 3.8rem;
            font-family: var(--font-primary);
            font-style: normal;
            font-weight: 800;
            font-size: 20px;
            line-height: 28px;
            color: var(--color-menu);
            margin: 0;
        }
    }
    @media (max-width: 768px) {
        .section__top {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .section__top--title {
                padding: 2.6rem 2.4rem 1.5rem;
                margin: 0;
            }
        }
    }
}
</style>
