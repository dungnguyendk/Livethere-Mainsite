<template>
    <div class="card--contact">
        <div class="card__top">
            <div class="card__content">
                <h4 class="content__head">{{ infoAgent?.agentHeading }}</h4>
                <div class="content__avatar">
                    <template v-if="infoAgent.agentImage">
                        <img :src="infoAgent.agentImage" alt="" />
                    </template>
                    <template v-else>
                        <i class="ri-user-3-fill"></i>
                    </template>
                </div>
                <h3 class="content__title"> {{ infoAgent?.agentName }} </h3>
                <p>
                    {{ infoAgent?.agentPosition }}
                </p>
            </div>
        </div>

        <div class="card__bottom">
            <a
                class="card__icon"
                :href="`sms:/+${
                    infoAgent.agentPhone ? infoAgent.agentPhone : ''
                }??body=I Would like to check the availability for ${getTitle} ${getUrl}`"
            >
                <img src="~/static/img/life-style-section/messages.png" alt="" />
            </a>
            <a
                :href="`tel://+${infoAgent.agentPhone ? infoAgent.agentPhone : ''}`"
                class="card__icon"
            >
                <img src="~/static/img/life-style-section/call-calling.png" alt="" />
            </a>
            <button class="card__icon" @click="isOpenContactDetailDialog = true">
                <img src="~/static/img/life-style-section/calendar-2.png" alt="" />
            </button>
            <button class="card__icon" @click="isOpenConfirmDetailDialog = true">
                <img src="~/static/img/life-style-section/whatsapp.png" alt="" />
            </button>
        </div>
        <ConfirmDetailDialog :open="isOpenConfirmDetailDialog" @close="closeConfirmDetailDialog" />
        <ContactDetailDialog :open="isOpenContactDetailDialog" @close="closeContactDetailDialog" />
    </div>
</template>

<script>
import ConfirmDetailDialog from "~/components/components/Section/components/Dialog/ConfirmDetailDialog.vue"
import ContactDetailDialog from "~/components/components/Section/components/Dialog/ContactDetailDialog.vue"

export default {
    name: "LifeStyleSectionCardContact",
    components: {
        ConfirmDetailDialog,
        ContactDetailDialog
    },
    props: {
        infoAgent: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            isOpenContactDetailDialog: false,
            isOpenConfirmDetailDialog: false
        }
    },
    computed: {
        getTitle() {
            if (process.client) {
                return document.title.slice(0, document.title.indexOf("|"))
            }
        },

        getUrl() {
            if (process.client) {
                return window.location.href
            }
        }
    },
    methods: {
        openConfirmDetailDialog(e) {
            this.isOpenConfirmDetailDialog = true
        },
        openContactDetailDialog(e) {
            this.isOpenContactDetailDialog = true
        },
        closeConfirmDetailDialog() {
            this.isOpenConfirmDetailDialog = false
        },
        closeContactDetailDialog() {
            this.isOpenContactDetailDialog = false
        }
    }
}
</script>

<style lang="scss" scoped>
.card__content {
    background-color: var(--color-bg-contant);
    border-radius: 20px;
    text-align: center;
    padding: 4.2rem 0;

    .content__head {
        font-weight: 700;
        font-size: 2rem;
        line-height: 2.8rem;
        color: var(--color-menu);
        margin-bottom: 0.8rem;
    }

    .content__avatar {
        margin-bottom: 1.6rem;

        img {
            border-radius: 1.6rem;
            width: 10rem;
            height: auto;
        }

        i {
            font-size: 10rem;
            color: var(--color-gray);
        }
    }

    .content__title {
        font-weight: 700;
        font-size: 2rem;
        line-height: 2.8rem;
        color: var(--color-text-back);
        margin-bottom: 0.4rem;
    }

    p {
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--color-text-back);
    }
}

.card__top {
    margin-bottom: 0.8rem;
    background-color: #f7ebe380;
    -webkit-border-radius: 2rem;
    -moz-border-radius: 2rem;
    border-radius: 2rem;
}

.card__bottom {
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 1024px) {
        grid-column-gap: 2.4rem;
    }

    .card__icon {
        flex: 0 0 8rem;
        width: 8rem;
        height: 5.4rem;
        border: 1px solid var(--color-menu);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;

        &:hover {
            background-color: var(--color-menu);

            img {
                filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(20%)
                    hue-rotate(325deg) brightness(104%) contrast(106%);
            }
        }

        @media screen and (max-width: 425px) {
            flex: 0 0 5.4rem;
            width: 5.4rem;
        }
    }
}
</style>
