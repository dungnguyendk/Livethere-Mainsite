<template lang="html">
    <div class="section--tenancy-details">
        <div class="section__top">
            <h3 class="top--label"> Tenancy Details </h3>
            <h3 class="top--id"> #{{ tenancyDetails ? tenancyDetails.tenancyRefCode : "-" }} </h3>
        </div>
        <div class="section__content">
            <div class="section__columns">
                <div class="section__column">
                    <p>
                        <span>Commercement Date:</span>
                        <strong>{{ startDateFormatter }}</strong>
                    </p>
                    <p>
                        <span>Lease Period (months):</span>
                        <strong>{{ tenancyDetails ? tenancyDetails.leasePeriod : "-" }}</strong>
                    </p>
                    <p>
                        <span>Secure Deposit:</span>
                        <strong>S$ {{ secureDepositFormatter }}</strong>
                    </p>
                </div>
                <div class="section__column">
                    <p>
                        <span>Expiry Date:</span>
                        <strong>{{ endDateFormatter }}</strong>
                    </p>
                    <p>
                        <span>Monthly Rent:</span>
                        <strong>S$ {{ monthlyRentalFormatter }}</strong>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import { convertNumberToCommas } from "~/ultilities/helpers"

export default {
    name: "TenancyDetailsPanel",
    data() {
        return {
            startDateFormatter: "",
            endDateFormatter: "",
            monthlyRentalFormatter: "",
            secureDepositFormatter: ""
        }
    },
    computed: {
        ...mapState({
            tenancyDetails: (state) => state.tenancy.tenancyDetails
        })
    },
    created() {
        // console.log("this.tenancyDetails", this.tenancyDetails)
        this.startDateFormatter = this.tenancyDetails
            ? this.formatDate(this.tenancyDetails.startDate)
            : ""
        this.endDateFormatter = this.tenancyDetails
            ? this.formatDate(this.tenancyDetails.endDate)
            : ""
        this.monthlyRentalFormatter = this.tenancyDetails
            ? convertNumberToCommas(this.tenancyDetails.monthlyRental)
            : ""
        this.secureDepositFormatter = this.tenancyDetails
            ? convertNumberToCommas(this.tenancyDetails.secureDeposit)
            : ""
    },
    methods: {
        formatDate(date) {
            if (!date) return null

            return this.$moment(date).format("DD-MMM-YYYY")
        }
    }
}
</script>
<style lang="scss" scoped>
.section--tenancy-details {
    background-color: var(--color-white);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 2.6rem 2.4rem;

    .section__top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 2.4rem;

        h3 {
            margin-bottom: 0;
        }

        .top--label {
            font-family: var(--font-primary);
            font-style: normal;
            font-weight: 800;
            font-size: 20px;
            line-height: 28px;
            color: var(--color-menu);
        }

        .top--id {
            font-family: var(--font-primary);
            font-style: normal;
            font-weight: 800;
            font-size: 20px;
            line-height: 28px;
            text-align: right;
            color: #171717;
        }
    }

    .section__columns {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-gap: 2.4rem;

        .section__column {
            p {
                display: flex;
                justify-content: flex-start;
                align-self: center;
                grid-gap: 2.4rem;
                gap: 2.4rem;
                font-family: var(--font-primary);
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 40px;
                color: #737373;

                span {
                    min-width: 16.5rem;
                }

                strong {
                    color: var(--color-heading);
                    font-weight: 500;
                }

                // &:not(:last-child) {
                //     margin-bottom: 0.4rem;
                // }
                // &:last-child {
                //     margin-bottom: 0;
                // }
                margin: 0;
            }
        }

        .section__column:nth-child(2) {
            p {
                span {
                    min-width: 10.2rem;
                }
            }
        }
    }

    @media (max-width: 768px) {
        .section__columns {
            display: flex;
            padding-right: 0;
            flex-wrap: wrap;
            gap: 0;

            .section__column:nth-child(1) {
                order: 1;

                p {
                    display: flex;
                    justify-content: flex-start;
                    align-self: center;
                    grid-gap: 2.4rem;
                    gap: 2.4rem;
                    color: #737373;

                    span {
                        min-width: 16.5rem;
                    }

                    strong {
                        color: var(--color-heading);
                        font-weight: 500;
                    }

                    // &:not(:last-child) {
                    //     margin-bottom: 0.4rem;
                    // }
                    // &:last-child {
                    //     margin-bottom: 0;
                    // }
                    margin: 0;
                }
            }

            .section__column:nth-child(2) {
                order: 2;
                flex: 0 0 100%;

                p {
                    span {
                        min-width: 16.5rem;
                    }
                }
            }
        }
    }
}
</style>
