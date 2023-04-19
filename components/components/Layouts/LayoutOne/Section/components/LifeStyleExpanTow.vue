<template>
    <div class="explan-tab">
        <v-expansion-panels v-model="lifeStyle">
            <v-expansion-panel v-for="item in source" :key="item.id">
                <v-expansion-panel-header disable-icon-rotate>
                    {{ item.heading }}
                    <template v-slot:actions>
                        <img
                            src="~/static/img/life-style-section/minus-icon.png"
                            alt=""
                            class="minus"
                        />
                        <img
                            src="~/static/img/life-style-section/plus-icon.png"
                            alt=""
                            class="plus"
                        />
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div class="tab__content">
                        <p>{{ item.content }}</p>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
export default {
    name: "LifeStyleExpanTow",

    props: {
        source: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            lifeStyle: 0
        }
    },
}
</script>
<style lang="scss" scoped>
.explan-tab:deep(.v-expansion-panels) {
    border: 1px solid var(--color-boder);
    border-radius: 20px;

    .v-expansion-panel {
        &--active {
            border-radius: 20px !important;
        }
        &:not(:first-child)::after {
            opacity: 1 !important;
        }
    }

    .v-expansion-panel::before {
        box-shadow: none;
    }

    .v-expansion-panel-header {
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2.2rem;
        color: var(--color-menu);

        .plus {
            display: inline-block;
        }

        .minus {
            display: none;
        }

        &--active {
            .plus {
                display: none;
            }

            .minus {
                display: inline-block;
            }
        }
    }

    .v-expansion-panel-content {
        p {
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-text-black);
        }
    }
}
</style>
