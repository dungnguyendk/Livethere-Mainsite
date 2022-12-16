<template lang="html">
    <div></div>
</template>

<script>
export default {
    name: ""
}
</script>
<template lang="html">
    <div class="container">
        <div class="box--tenacy-expenses">
            <div class="section__top">
                <h3 class="section__top--title"> Expenses </h3>
                <div class="section__add--button">
                    <a>
                        <i class="ri-file-download-line"></i>
                        Export to PDF
                    </a>
                </div>
            </div>
            <TenancyExpenseTable />
        </div>
    </div>
</template>

<script>
import TenancyExpenseTable from "./Table/TenancyExpense/TenancyExpenseTable.vue"
export default {
    name: "TenancyExpenses",
    components: { TenancyExpenseTable }
}
</script>
<style lang="scss" scoped>
.container {
    padding-top: 2.4rem;
}
.box--tenacy-expenses {
    padding-bottom: 5rem;
    background: #ffffff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 20px;

    .section__top {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .section__top--title {
            padding: 2.6rem 2.4rem 3.7rem;
            font-family: "Nunito";
            font-style: normal;
            font-weight: 800;
            font-size: 20px;
            line-height: 28px;
            color: #00634f;
            margin: 0;
        }
        .section__add--button {
            padding: 2rem 2.4rem 3.2rem 2.4rem;
            
            a {
                display: flex;
                min-width: 16rem;
                font-family: "Nunito";
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 20px;
                justify-content: center;
                align-items: center;
                padding: 13.33px 17.33px;
                gap: 5.3px;
                /* 26A0F6 cyan */
                box-sizing: border-box;
                border: 1px solid #00634f;
                border-radius: 8px;
                color: #00634f;
            }
            a:hover {
                background-color: #00634f;
                color: #ffff;
                //text-decoration-line: underline;
            }
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
            .section__add--button {
                padding-bottom: 1.5rem;
            }
        }
    }
}
</style>
