<template>
    <v-dialog v-model="openDialog" width="677" persistent>
        <div class="card--dialog">
            <div class="card__header">
                <h4>Filter</h4>
                <button @click="onClose">
                    <i class="icon-svg svg-close-circle"></i>
                </button>
            </div>
            <div class="card__content">
                <FilterProjectForm @close="onClose" @snackbar="openSnackbar($event)"/>
            </div>
        </div>
    </v-dialog>
</template>

<script>
import FilterProjectForm from '~/components/components/Projects/components/Form/FilterProjectForm.vue'
export default {
    name: "FilterDialog",
    components: { FilterProjectForm },
    data() {
        return {
            openDialog: false,
            snackbar: false
        }
    },
    props: {
        open: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: "medium" // small, medium, large
        }
    },
    methods: {
        onClose() {
            this.openDialog = false
            this.$emit("close")
        },
        openSnackbar(e){
            this.$emit("snackbar", this.snackbar = e)
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
    background: var(--color-white);
    border-radius: 2rem;
    .card__header {
        padding: 1.5rem 1.9rem 2rem;
        display: flex;

        @media screen and (max-width: 767px) {
            align-items: center;
        }

        button {
            i {
                width: 3.2rem;
                height: 3.2rem;
            }
        }
        h4 {
            text-align: center;
            margin-bottom: 0;
            width: 100%;
            padding-left: 3.2rem;
            margin-top: 2rem;

            @media screen and (max-width: 767px) {
                font-size: 1.8rem;
                margin-top: 0;
                padding-left: 0;
            }
        }
    }
    .card__content {
        :deep(.form--filter-projects) {
            @media screen and (max-width: 767px) {
                .form__fields {
                    padding: 0 2.4rem 2.4rem;
                }
                .form__footer {
                    padding: 1.6rem 2.4rem;
                }
                .v-input--checkbox {
                    .v-label {
                        .form__field-label-custom {
                            display: flex;
                            align-items: center;
                        }
                    }
                }
            }
        }
    }
}
</style>
