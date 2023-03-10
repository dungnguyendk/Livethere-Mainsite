<template>
    <v-dialog v-model="openDialog" width="600" persistent>
        <div class="card--dialog">
            <div class="card__header">
                <h4>Share this listing</h4>
                <button @click="onClose">
                    <i class="ri-close-line"></i>
                </button>
            </div>
            <div class="card__content">
                <ShareSocialForm :item="item"/>
            </div>
        </div>
    </v-dialog>
</template>

<script>
import ShareSocialForm from '../Form/ShareSocialForm.vue';
export default {
    name: 'ShareSocialDialog',
    components: {ShareSocialForm},
    data() {
        return {
            openDialog: false, 
    
        };
    },
    props: {
        open: {
            type: Boolean,
            default: false
        }, 
        item: {
            type: Object, 
            default: ()=> {}
        }

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
        }, 
        
    }
};
</script>

<style lang="scss" scoped>
.card--dialog{
    background: var(--color-white);
    border-radius: 0.4rem;
    .card__header{
        padding: 0.8rem 1.6rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        h4{
            margin: 0; 
            padding: 0;
            text-align: left;
            font-size: 2rem;
        }
        button{
            i{
                font-size: 2.3rem;
            }
        }
    }
    .card__content{
        padding: 1.6rem;
    }
}
</style>