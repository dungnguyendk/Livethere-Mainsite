<template lang="html">
    <div class="container">
        <div class="section--tenancy-details">
            <div class="section__top">
                <div class="top--title"> Tenancy Details </div>
                <div class="top--id"> #348503 </div>
            </div>
            <div class="section__content">
                <div class="block__item">
                    <div class="item">
                        <div class="stub-heading">
                            <p> Commercement Date:</p>
                        </div>
                        <div class="stub-property">
                            <p>20/09/2020</p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="stub-heading">
                            <p>Lease Period (months):</p>
                        </div>
                        <div class="stub-property">
                            <p>24</p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="stub-heading">
                            <p>Secure Deposit:</p>
                        </div>
                        <div class="stub-property">
                            <p>SGD 9,000</p>
                        </div>
                    </div>
                </div>
                <div class="block__item">
                    <div class="item">
                        <div class="stub-heading">
                            <p>Expiry Day:</p>
                        </div>
                        <div class="stub-property">
                            <p>20/09/2020</p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="stub-heading">
                            <p>Monthly Rent:</p>
                        </div>
                        <div class="stub-property">
                            <p>SGD 3,000</p>
                        </div>
                    </div>
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
        .top--title {
            font-family: "Nunito";
            font-style: normal;
            font-weight: 800;
            font-size: 20px;
            line-height: 28px;
            /* identical to box height, or 140% */

            /* Main/Watercourse #00634F */

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
    }

    .block__item {
        .item {
            display: flex;
            .stub-heading {
                min-width: 16.5rem;
                p {
                    display: inline-block;
                    margin: 0;
                    font-family: "Nunito";
                    font-style: normal;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 40px;
                    /* or 250% */

                    /* Grey text #737373 */

                    color: #737373;
                }
            }
            .stub-property {
                padding-left: 1.2rem;
                min-width: 10.7rem;
                p {
                    max-width: 25rem;
                    // white-space: nowrap;
                    margin: 0;
                    font-family: "Nunito";
                    font-style: normal;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 40px;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    // line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;

                    color: #171717;
                }
            }
        }
    }
    .block__item:nth-child(2) {
        .item {
            .stub-heading {
                min-width: 10.2rem;
            }
        }
    }

    @media (max-width: 768px) {
        .section__content {
            padding-right: 0;
            flex-wrap: wrap;
            gap: 0;
            .block__item:nth-child(1) {
                order: 1;
            }
            .block__item:nth-child(2) {
                order: 2;
                flex: 0 0 100%;
                .item {
                    .stub-heading {
                        min-width: 16.5rem;
                    }
                }
            }
        }
    }
}
</style>
