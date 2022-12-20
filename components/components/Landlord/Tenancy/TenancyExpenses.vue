<template lang="html">
    <div class="container">
        <div class="section--tenacy-expenses">
            <div class="section__top">
                <h3 class="top--label"> Expenses </h3>
                <div class="top--button">
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
.section--tenacy-expenses {
    padding-bottom: 5rem;
    background-color: var(--color-white);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 20px;

    .section__top {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .top--label {
            padding: 2.6rem 2.4rem 3.7rem;
            font-family: var( --font-primary);
            font-style: normal;
            font-weight: 800;
            font-size: 20px;
            line-height: 28px;
            color: var(--color-menu);
            margin: 0;
        }
        .top--button {
            padding: 2rem 2.4rem 3.2rem 2.4rem;
            
            a {
                display: flex;
                min-width: 16rem;
                font-family: var( --font-primary);
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
                border: 1px solid var(--color-menu);
                border-radius: 8px;
                color: var(--color-menu);
            }
            a:hover {
                background-color:var(--color-menu);
                color: var(--color-white);
                //text-decoration-line: underline;
            }
        }
    }
    @media (max-width: 768px) {
        .section__top {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .top--label {
                padding: 2.6rem 2.4rem 1.5rem;
                margin: 0;
            }
            .top--button {
                padding-bottom: 1.5rem;
            }
        }
    }
}
</style>
