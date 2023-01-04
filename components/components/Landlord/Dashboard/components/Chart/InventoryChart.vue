<template lang="html">
    <div class="section-chart">
        <label class="chart-title">Inventory</label>
        <div class="row justify-content-between d-flex mt-5">
            <div class="col-auto text-center">
                <div class="progress" :data-percentage="total">
                    <span class="progress-left">
                        <span class="progress-bar"></span>
                    </span>
                    <span class="progress-right">
                        <span class="progress-bar"></span>
                    </span>
                    <div class="progress-value">
                        <div>
                            <span>{{ dashboard.totalInventories }}</span>
                        </div>
                    </div>
                </div>
                <label class="name-progress">Total</label>
            </div>
            <div class="col-auto text-center">
                <div class="progress progress--blue" :data-percentage="tenant">
                    <span class="progress-left">
                        <span class="progress-bar progress-bar--blue"></span>
                    </span>
                    <span class="progress-right">
                        <span class="progress-bar progress-bar--blue"></span>
                    </span>
                    <div class="progress-value progress-value--blue">
                        <div>
                            <span>{{ dashboard.tenantInventories }}</span>
                        </div>
                    </div>
                </div>
                <label class="name-progress">Tenanted</label>
            </div>
            <div class="col-auto text-center">
                <div class="progress progress--orange" :data-percentage="vacant">
                    <span class="progress-left">
                        <span class="progress-bar progress-bar--orange"></span>
                    </span>
                    <span class="progress-right">
                        <span class="progress-bar progress-bar--orange"></span>
                    </span>
                    <div class="progress-value progress-value--orange">
                        <div>
                            <span>{{ dashboard.vacantInventories }}</span>
                        </div>
                    </div>
                </div>
                <label class="name-progress">Vacant</label>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "InventoryChart",
    computed: {
        ...mapState({
            dashboard: (state) => state.dashboard.dashBoards
        }),
        total() {
            return this.dashboard ? (this.dashboard.totalInventories / this.dashboard.totalInventories) * 100 : 0
        },
        tenant() {
            return this.dashboard ? ((this.dashboard.tenantInventories / this.dashboard.totalInventories) * 100).toFixed() : 0
        },
        vacant() {
            return this.dashboard ? ((this.dashboard.vacantInventories / this.dashboard.totalInventories) * 100).toFixed() : 0
        }
    },
}
</script>
<style lang="scss" scoped>
.section-chart {
    padding: 1.6rem;
    background: var(--color-white);
    box-shadow: 0px 9px 50px rgba(56, 56, 56, 0.1);
    border-radius: 2rem;
    min-height: 20rem;
}

.chart-title {
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.2rem;
    color: var(--color-title-black);
}

.name-progress {
    padding: 1rem 0;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: #171717;
    margin-bottom: 0;
}

//styling
$borderWidth: 0.7rem;
$animationTime: 1.5s;
$border-color-default-green: hsla(142, 62%, 90%, 1);
$border-color-fill-green: #27A857;
$border-color-default-blue: hsla(240, 83%, 93%, 1);
$border-color-fill-blue: #5D5FEF;
$border-color-default-orange: hsla(29, 100%, 92%, 1);
$border-color-fill-orange: #FF9A3E;
$size: 7rem;

//Create how many steps
$howManySteps: 200; //this needs to be even. 
//for fun try using 20 and changine in the HTML the data-percentage to 15 or 85

.progress {
    width: $size;
    height: $size;
    line-height: $size;
    background: none;
    margin: 0 auto;
    box-shadow: none;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0rem;

    &--blue {
        &:after {
            border: $borderWidth solid $border-color-default-blue !important;
        }

        .progress-bar--blue {
            border-color: $border-color-fill-blue !important;
        }

        .progress-value--blue {
            span {
                color: #5D5FEF !important;
            }
        }
    }

    &--orange {
        &:after {
            border: $borderWidth solid $border-color-default-orange !important;
        }

        .progress-bar--orange {
            border-color: $border-color-fill-orange !important;
        }

        .progress-value--orange {
            span {
                color: #FF9A3E !important;
            }
        }
    }

    &:after {
        content: "";
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: $borderWidth solid $border-color-default-green;
        position: absolute;
        top: 0;
        left: 0;
    }

    >span {
        width: 50%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        z-index: 1;
    }

    .progress-left {
        left: 0;
    }

    .progress-bar {
        width: 100%;
        height: 100%;
        background: none;
        border-width: $borderWidth;
        border-style: solid;
        position: absolute;
        top: 0;
        border-color: $border-color-fill-green;
    }

    .progress-left .progress-bar {
        left: 100%;
        border-top-right-radius: ($size/2);
        ;
        border-bottom-right-radius: ($size/2);
        ;
        border-left: 0;
        -webkit-transform-origin: center left;
        transform-origin: center left;
        //animation: loading-2 1.5s linear forwards 1.8s;
    }

    .progress-right {
        right: 0;

        .progress-bar {
            left: -100%;
            border-top-left-radius: ($size/2);
            ;
            border-bottom-left-radius: ($size/2);
            ;
            border-right: 0;
            -webkit-transform-origin: center right;
            transform-origin: center right;
            //animation: loading-1 1.8s linear forwards;
        }
    }

    .progress-value {
        display: flex;
        border-radius: 50%;
        font-size: 36px;
        text-align: center;
        line-height: 20px;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-weight: 300;

        div {
            margin-top: 0rem;
        }

        span {
            color: #27A857;
            font-weight: 700;
            font-size: 2rem;
            line-height: 2.7rem;
            text-transform: uppercase;
        }
    }
}

/* This for loop creates the 	necessary css animation names 
Due to the split circle of progress-left and progress right, we must use the animations on each side. 
*/
@for $i from 1 through $howManySteps {
    $stepName: ($i*(100 / $howManySteps));

    //animation only the left side if below 50%
    @if $i <=($howManySteps/2) {
        .progress[data-percentage="#{$stepName}"] {
            .progress-right .progress-bar {
                animation: loading-#{$i} $animationTime linear forwards;
            }

            .progress-left .progress-bar {
                animation: 0;
            }
        }
    }

    //animation only the right side if above 50%
    @if $i >($howManySteps/2) {
        .progress[data-percentage="#{$stepName}"] {
            .progress-right .progress-bar {
                animation: loading-#{($howManySteps/2)} $animationTime linear forwards; //set the animation to longest animation
            }

            .progress-left .progress-bar {
                animation: loading-#{$i - ($howManySteps/2)} $animationTime linear forwards $animationTime;
            }
        }
    }
}

//animation
@for $i from 1 through ($howManySteps/2) {
    $degrees: (180/($howManySteps/2));
    $degrees: ($degrees*$i);

    @keyframes loading-#{$i} {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100% {
            -webkit-transform: rotate($degrees);
            transform: rotate(#{$degrees}deg);
        }
    }
}
</style>    