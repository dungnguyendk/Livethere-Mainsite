<template>
    <v-dialog v-model="openDialog" fullscreen persistent>
        <div class="card--dialog">
            <div class="card__header">
                <div class="container">
                    <div class="card__header-back">
                        <v-btn icon @click="onClose">
                            <v-icon size="35" color="#00634F">mdi-arrow-left</v-icon>
                        </v-btn>
                        <h3>whatsapp agent</h3>
                    </div>
                </div>
            </div>
            <div class="card__content">
                <div class="container">
                    <div class="card__content-user-info">
                        <v-avatar size="50">
                            <template v-if="projectDetail.primaryAgent && projectDetail.primaryAgent.avatarUrl">
                                <img :src="projectDetail.primaryAgent.avatarUrl" alt="" />
                            </template>
                            <template>
                                <img :src="require(`~/static/img/agent_placeholder.png`)" alt="" />
                            </template>
                        </v-avatar>
                        <p>{{projectDetail.primaryAgent?.businessName}}</p>
                    </div>
                    <div class="card__content-form">
                        <ConfirmDetailForm @onClose="onClose" />
                    </div>
                </div>
            </div>
        </div>
        
    </v-dialog>
</template>

<script>
import ConfirmDetailForm from "~/components/components/Projects/components/Form/ConfirmDetailForm.vue"
import {mapState} from "vuex";

export default {
    name: "ConfirmDetailDialog",
    components: { ConfirmDetailForm },
    data() {
        return {
            openDialog: false,
            snackbar: true
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
    // height: 100%;
    // background-color: var(--color-white);
    .card__header {
        background-color: var(--color-white);
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08);
        border-radius: 0 0 2rem 2rem;
        .card__header-back {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 2.7rem 2.4rem;
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
    .card__content {
        .card__content-user-info {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 2.7rem 2.4rem;
            p {
                font-weight: 700;
                font-size: 1.76rem;
                line-height: 2rem;
                color: var(--color-title-black);
                margin-bottom: 0;
                text-transform: capitalize;
                margin-left: 2.5rem;
            }
        }
        .card__content-form {
            padding: 2.7rem 2.4rem;
        }
    }
}
</style>
