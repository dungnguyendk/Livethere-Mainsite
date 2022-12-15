<template lang="html">
    <div class="container">
        <div class="section--property-details">
            <div class="section__top">
                <h3 class="section__top--title">Property Details</h3>
                <div class="section__items">
                    <div class="block__item">
                        <div class="item">
                            <div class="stub-heading">
                                <p>House No: </p>
                            </div>
                            <div class="stub-property"> <p>98</p></div>
                        </div>
                        <div class="item">
                            <div class="stub-heading">
                                <p>Unit No: </p>
                            </div>
                            <div class="stub-property"> <p>10-24</p></div>
                        </div>
                        <div class="item">
                            <div class="stub-heading">
                                <p>No of Bedroom(s): </p>
                            </div>
                            <div class="stub-property"> <p>2</p></div>
                        </div>
                    </div>
                    <div class="block__item">
                        <div class="item">
                            <div class="stub-heading">
                                <p>Street Name: </p>
                            </div>
                            <div class="stub-property"> <p>Lloy Road</p></div>
                        </div>
                        <div class="item">
                            <div class="stub-heading">
                                <p>Project Name: </p>
                            </div>
                            <div class="stub-property"> <p>Lloyd Sixtyfive</p></div>
                        </div>
                        <div class="item">
                            <div class="stub-heading">
                                <p>Project Type: </p>
                            </div>
                            <div class="stub-property"> <p>Condo</p></div>
                        </div>
                    </div>
                    <div class="block__item">
                        <div class="item">
                            <div class="stub-heading">
                                <p>Postal Code: </p>
                            </div>
                            <div class="stub-property"> <p>239114</p></div>
                        </div>
                        <div class="item">
                            <div class="stub-heading">
                                <p>Tenure: </p>
                            </div>
                            <div class="stub-property"> <p>FreeHold</p></div>
                        </div>
                        <div class="item">
                            <div class="stub-heading">
                                <p>Floor Area (sqrt): </p>
                            </div>
                            <div class="stub-property"> <p>1,690 sqrt</p></div>
                        </div>
                        <div class="item">
                            <div class="stub-heading">
                                <p>Land Area (sprt): </p>
                            </div>
                            <div class="stub-property"> <p>2,172 sqrt</p></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section__bottom">
                <h3 class="section__bottom--title"> Tenancy Agreement </h3>
                <TenantAgreementTable />
            </div>
        </div>
    </div>
</template>

<script>
import TenantAgreementTable from "~/components/components/Landlord/Property/Table/TenancyAgreementTable.vue"

export default {
    name: "PropertyDetails",
    components: { TenantAgreementTable }
}
</script>
<style lang="scss" scoped>
.section--property-details {
    background: #ffffff;
    /* Medium */
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    .section__top--title {
        padding: 2.7rem 0rem 1.2rem;
        font-family: "Nunito";
        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        line-height: 28px;
        color: #00634f;
        margin: 0;
    }
    .section__bottom--title {
        border-top: 1px solid #e5e5e5;
        padding: 3.2rem 0rem 2rem;
        font-family: "Nunito";
        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        line-height: 28px;
        color: #00634f;
        margin: 0;
    }
    .section__top {
        padding: 2.7rem 2.4rem 3.2rem 3.2rem;
        //border-radius: 20px;

        .section__items {
            display: flex;
            justify-content: space-between;
            padding-right: 5.5rem;
        }
        .item {
            display: flex;
        }
        .block__item {
            .stub-heading {
                min-width: 14rem;
                p {
                    display: inline-block;
                    margin: 0;
                    font-family: "Nunito";
                    font-style: normal;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 40px;
                    color: #737373;
                }
            }
            .stub-property {
                max-width: 10.7rem;
                p {
                    margin: 0;
                    font-family: "Nunito";
                    font-style: normal;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 40px;
                    /* or 250% */

                    /* Text #171717 */

                    color: #171717;
                }
            }
        }
    }
    .section__bottom {
        padding: 0 2.4rem 4rem 2.2rem;
    }
    @media (max-width: 768px) {
        .section__items {
            flex-wrap: wrap;

            .block__item:nth-child(1) {
                order: 1;
            }
            .block__item:nth-child(2) {
                order: 2;
            }
            .block__item:nth-child(3) {
                order: 3;
                flex: 0 0 100%;
            }
        }
    }
}
</style>
