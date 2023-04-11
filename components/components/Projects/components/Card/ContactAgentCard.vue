<template>
    <div class="card--contact-agent">
        <div class="card__header">
            <h3>contact agent</h3>
        </div>
        <div class="card__content">
            <div class="card__content-avatar">
                <v-avatar size="64">
                    <template v-if="info.avatarUrl">
                        <img :src="info.avatarUrl" alt="" />
                    </template>
                    <template>
                        <img :src="require(`~/static/img/agent_placeholder.png`)" alt="" />
                    </template>
                </v-avatar>
            </div>
            <div class="card__content-infor">
                <h3>{{ info?.businessName }}</h3>
                <p>{{ info?.companyName }}</p>
                <p>{{ info?.cea }}</p>
            </div>
        </div>
        <div class="card__features">
            <v-btn
                class="btn btn--outline btn--green btn-custom"
                :href="`sms:/+65 ${info?.phoneNumber}?body=I Would like to check the availability for ${projectDetail.buildingName}, ${projectDetail.buildingAddress}, ${getUrl}.`"
                target="_blank"
            >
                <i class="icon-svg svg-messages"></i>
            </v-btn>
            <v-btn
                class="btn btn--outline btn--green btn-custom"
                :href="`tel:${info?.phoneNumber}`"
            >
                <i class="icon-svg svg-call-calling"></i>
            </v-btn>
            <v-btn
                class="btn btn--outline btn--green btn-custom"
                @click="onOpenContactDetailDialog()"
            >
                <i class="icon-svg svg-calendar"></i>
            </v-btn>
            <v-btn
                class="btn btn--outline btn--green btn-custom"
                @click="onOpenConfirmDetailDialog()"
            >
                <i class="icon-svg svg-whatsapp"></i>
            </v-btn>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"

export default {
    name: "ContactAgentCard",
    props: {
        info: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            isOpenConfirmDetailDialog: false,
            isOpenContactDetailDialog: false
        }
    },
    computed: {
        ...mapState({
            projectDetail: (state) => state.project.projectDetails
        }),

        getUrl() {
            if (process.client) {
                return window.location.href
            }
        }
    },
    methods: {
        onOpenConfirmDetailDialog() {
            this.$emit("openConfirm", (this.isOpenConfirmDetailDialog = true))
        },
        onOpenContactDetailDialog() {
            this.$emit("openContact", (this.isOpenContactDetailDialog = true))
        }
    }
}
</script>

<style lang="scss" scoped>
.card--contact-agent {
    background-color: var(--color-white);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08);
    border-radius: 2rem;
    background-color: var(--color-white);
    margin-bottom: 2.4rem;
    margin-top: 5.5rem;
    .card__header {
        padding: 1.7rem 2.4rem 0;
        h3 {
            font-weight: 700;
            font-size: 2rem;
            line-height: 2rem;
            color: #000000;
            text-transform: capitalize;
        }
    }
    .card__content {
        padding: 1rem 2.4rem 2rem;
        display: flex;
        align-items: flex-start;
        .card__content-avatar {
            margin-right: 1.2rem;
            padding-top: 0.7rem;
        }
        .card__content-infor {
            h3 {
                font-weight: 700;
                font-size: 18px;
                line-height: 20px;
                color: var(--color-title-black);
                text-transform: capitalize;
                margin-bottom: 0.8rem;
            }
            p {
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2rem;
                color: var(--color-label);
                margin-bottom: 0.8rem;
            }
        }
    }
    .card__features {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.6rem 2.4rem;
        flex-wrap: wrap;
    }
    @media screen and (max-width: 1024px) {
        .card__features {
            .btn-custom {
                width: 6rem;
                i {
                    width: 2rem;
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        .card__content {
            flex-direction: column;
            justify-content: center;
            .card__content-avatar {
                margin: 0 auto;
                padding-top: 0;
                padding-bottom: 1.5rem;
            }
            .card__content-infor {
                display: flex;
                justify-content: center;
                flex-direction: column;
                width: 100%;
                h3 {
                    text-align: center;
                }
                p {
                    text-align: center;
                }
            }
        }
        .card__features {
            .btn-custom {
                width: 4rem;
                i {
                    width: 2rem;
                }
            }
        }
    }
}
.btn-custom {
    width: 7.4rem;
    &:hover,
    &:active {
        i {
            background-color: var(--color-white);
        }
    }
}
</style>
