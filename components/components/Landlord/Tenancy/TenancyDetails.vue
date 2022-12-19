<template lang="html">
    <div class="container">
        <div class="section--tenancy-details">
            <div class="section__top">
                <h3 class="top--label"> Tenancy Details </h3>
                <h3 class="top--id"> #348503 </h3>
            </div>
            <div class="section__content">
                <div class="section__list">
                    <ul class="section__list-label">
                        <li> Commercement Date: </li>
                        <li> Lease Period (months): </li>
                        <li> Secure Deposit: </li>
                    </ul>
                    <ul class="section__list-property">
                        <li> 20/09/2020 </li>
                        <li> 24 </li>
                        <li> SGD 9,000 </li>
                    </ul>
                </div>
                <div class="section__list">
                    <ul class="section__list-label">
                        <li> Expiry Date: </li>
                        <li> Monthly Rent: </li>
                    </ul>
                    <ul class="section__list-property">
                        <li> 20/09/2022 </li>
                        <li> SGD 3,000 </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TenancyDetails"
}
</script>
<style lang="scss" scoped>
.section--tenancy-details {
    background: #ffffff;
    /* Medium */

    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    .section__top {
        padding: 2.7rem 2.4rem 2.4rem 2.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h3 {
            margin-bottom: 0;
        }
        .top--label {
            font-family: "Nunito";
            font-style: normal;
            font-weight: 800;
            font-size: 20px;
            line-height: 28px;
            color: #00634f;
        }
        .top--id {
            font-family: "Nunito";
            font-style: normal;
            font-weight: 800;
            font-size: 20px;
            line-height: 28px;
            /* identical to box height, or 140% */

            text-align: right;

            /* Text #171717 */

            color: #171717;
        }
    }
    .section__content {
        padding-left: 2.4rem;
        padding-bottom: 2.6rem;
        display: flex;
        justify-content: flex-start;
        gap: 23.3rem;
        .section__list {
            display: flex;
            font-family: "Nunito";
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 40px;
            .section__list-label {
                list-style-type: none;
                padding-left: 0;
                margin-bottom: 0;
                min-width: 16.5rem;
                color: #737373;
            }
            .section__list-property {
                padding-left: 1.2rem;
                min-width: 10.7rem;
                margin-bottom: 0;
                color: #171717;
                li {
                    max-width: 25rem;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    // line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            }
        }
        .section__list:nth-child(2) {
            .section__list-label {
                min-width: 10.2rem;
            }
        }
    }

    @media (max-width: 768px) {
        .section__content {
            padding-right: 0;
            flex-wrap: wrap;
            gap: 0;
            .section__list:nth-child(1) {
                order: 1;
            }
            .section__list:nth-child(2) {
                order: 2;
                flex: 0 0 100%;
                .section__list-label {
                    min-width: 16.5rem;
                }
            }
        }
    }
}
</style>
