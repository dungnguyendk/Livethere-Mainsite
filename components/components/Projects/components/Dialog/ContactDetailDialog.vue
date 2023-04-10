<template>
    <v-dialog v-model="openDialog" fullscreen>
        <div class="card--dialog">
            <div class="card__header">
                <div class="container">
                    <template v-if="isShowArticleOrForm">
                        <div class="card__header-back">
                            <v-btn icon @click="isShowArticleOrForm = !isShowArticleOrForm">
                                <v-icon size="35" color="#00634F">mdi-arrow-left</v-icon>
                            </v-btn>
                            <h3>enter your contact details</h3>
                        </div>
                    </template>
                    <template v-else>
                        <div class="card__header-back">
                            <v-btn icon @click="onClose">
                                <v-icon size="35" color="#00634F">mdi-arrow-left</v-icon>
                            </v-btn>
                            <h3>schedule a visit</h3>
                        </div>
                    </template>
                </div>
            </div>
            <div class="card__content">
                <div class="container">
                    <div class="card__content-box-info">
                        <div class="card__content-box" @click="onClose">
                            <div class="card__content-box-text">
                                <h3>{{projectDetail.buildingName}}</h3>
                                <p>{{ projectDetail.buildingAddress }}</p>
                            </div>
                            <div class="card__content-box-image">
                                <img src="https://picsum.photos/600/400.jpg?random=" alt="" />
                            </div>
                        </div>
                    </div>
                    <template v-if="isShowArticleOrForm">
                        <div class="card__content-article">
                            <ContactDetailForm @onClose="onClose" />
                        </div>
                    </template>
                    <template v-else>
                        <div class="card__content-article">
                            <p
                                >There are currently no scheduled inspections days for this
                                property. The agent will contact you to arrange a suitable
                                inspection date and time.</p
                            >
                            <div class="card__content-article-check">
                                <v-checkbox
                                    color="#00634F"
                                    hide-details
                                    class="v-checkbox-custom"
                                />
                                <span>Request a remote viewing</span>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <div
                                            v-bind="attrs"
                                            v-on="on"
                                            class="card__content-article-info"
                                        >

                                            <v-icon size="25">mdi-information-outline</v-icon>
                                        </div>
                                    </template>
                                    <span
                                        >If you cannot attend an inspection in person, the agent can
                                        show you around the unit using their mobile phone</span
                                    >
                                </v-tooltip>
                            </div>
                            <v-btn
                                class="btn btn--primary btn--green btn-custom"
                                @click="isShowArticleOrForm = !isShowArticleOrForm"
                                >Continue</v-btn
                            >
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </v-dialog>
</template>

<script>
import ContactDetailForm from "~/components/components/Projects/components/Form/ContactDetailForm.vue"

import {mapState} from "vuex";

export default {
    name: "ContactDetailDialog",
    components: { ContactDetailForm },
    data() {
        return {
            openDialog: false,
            isShowArticleOrForm: false
        }
    },
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState({
            projectDetail: state => state.project.projectDetails
        }),
    },
    methods: {
        onClose() {
            this.openDialog = false
            this.$emit("close")
        }
    },
    watch: {
        open(val) {
            this.openDialog = val
        }
    }
}
</script>

<style lang="scss" scoped>
.card--dialog {
    height: 100%;
    background-color: var(--color-white);

    .card__header {
        background-color: var(--color-white);
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08);
        border-radius: 0 0 2rem 2rem;
        .card__header-back {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 2.7rem 0;
            h3 {
                font-weight: 700;
                font-size: 1.76rem;
                line-height: 2rem;
                color: var(--color-title-black);
                margin-bottom: 0;
                text-transform: capitalize;
                margin-left: 1rem;
                color: var(--color-primary);
            }
        }
    }
    @media screen and(max-width: 480px) {
        .card__content-box {
            .card__content-box-image {
                margin-left: 0.8rem;
            }
        }
        .card__content-article {
            p {
                text-align: justify;
            }
        }

    }
}
.card__content-box-info {
}
.card__content-box {
    border-radius: 1rem;
    border: 0.1rem solid var(--border-color);
    padding: 2rem 2.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2.7rem 0;
    cursor: pointer;
    .card__content-box-text {
        h3 {
            font-weight: 700;
            font-size: 1.76rem;
            line-height: 2rem;
            color: var(--color-title-black);
            margin-bottom: 2rem;
            text-transform: capitalize;
            text-align: left;
        }
        p {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2rem;
            color: var(--color-title-black);
            margin-bottom: 0;
        }
    }
    .card__content-box-image {
        width: 7rem;
        height: auto;
        img {
            width: 100%;
            object-fit: cover;
            height: auto;
        }
    }
}
.card__content-article {
    p {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 3rem;
        color: var(--color-title-black);
        margin-bottom: 0;
    }
    .card__content-article-check {
        display: flex;
        align-items: center;

        span {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 3rem;
            color: var(--color-title-black);
            margin-right: 0.5rem;
        }
    }
}
.card__content-article-info {
    margin: 2.7rem 0;
    display: flex;
    align-items: center;
    order: 3;
}
.v-checkbox-custom {
    margin-top: 0;
    padding-top: 0;
}
.btn-custom {
    display: inline-block;
    width: 100%;
    padding: 2.4rem 0;

}
</style>
