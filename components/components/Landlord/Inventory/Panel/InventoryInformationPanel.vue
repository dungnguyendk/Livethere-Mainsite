<template lang="html">
    <div class="panel--landlord panel--property-information">
        <div class="panel__top"><h3>Property Details</h3></div>
        <div class="panel__columns">
            <div class="panel__column">
                <p>
                    <span>House No:</span>
                    <strong>98</strong>
                </p>
                <p>
                    <span>Unit No:</span>
                    <strong>98</strong>
                </p>
                <p>
                    <span>No of Bedroom(s): </span>
                    <strong>2</strong>
                </p>
            </div>
            <div class="panel__column">
                <p>
                    <span>Street name:</span>
                    <strong>98</strong>
                </p>
                <p>
                    <span>Project Name:</span>
                    <strong>Loyd Sixtyfive Lloyd Sixtyfive Lloyd Sixtyfive</strong>
                </p>
                <p>
                    <span>Postal Code:</span>
                    <strong>239114</strong>
                </p>
            </div>
            <div class="panel__column">
                <p>
                    <span>Postal Code:</span>
                    <strong>239114</strong>
                </p>
                <p>
                    <span>Tenure:</span>
                    <strong>FreeHold</strong>
                </p>
                <p>
                    <span>Floor Area (sqrt):</span>
                    <strong>1,690 sqrt</strong>
                </p>
                <p>
                    <span>Land Area (sprt):</span>
                    <strong>2,172 sqrt</strong>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "InventoryInformationPanel"
}
</script>

<style lang="scss" scoped>
.panel--property-information {
    .panel__top {
        h3 {
            font-size: 2rem;
            color: var(--color-primary);
            font-weight: 700;
        }
    }

    .panel__column {
        p {
            grid-gap: 2.4rem;
            gap: 2.4rem;

            span {
                font-weight: 500;
            }

            strong {
                font-weight: 500;
                color: var(--color-heading);
            }

            &:not(:last-child) {
                margin-bottom: 0.4rem;
            }
        }
    }

    .panel__columns {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-gap: 2.4rem;
    }

    .panel__container {
        background-color: #fff;
    }

    @media screen and (min-width: 1280px) {
        .panel__column {
            p {
                font-size: 1.6rem;
            }
        }
    }

    @media screen and (max-width: 1279px) {
        .panel__top {
            h3 {
                font-size: 1.6rem;
            }
        }

        .panel__columns {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media screen and (max-width: 768px) {
        .panel__columns {
            grid-template-columns: minmax(0, 1fr);
        }
    }
}
</style>
