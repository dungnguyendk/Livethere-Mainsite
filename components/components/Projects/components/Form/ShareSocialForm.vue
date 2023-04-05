<template>
    <form class="form--share-social">
        <div class="form__top">
            <v-btn
                class="ma-1 form__btn-custom"
                color="#3b5998"
                height="48"
                width="48"
                :href="`https://www.facebook.com/sharer/sharer.php?u=${linkURL}`"
                target="_blank"
            >
                <i class="ri-facebook-fill"></i>
            </v-btn>
            <v-btn
                class="ma-1 form__btn-custom"
                color="#25d366"
                height="48"
                width="48"
                :href="`https://wa.me/?text=${linkURL}`"
                target="_blank"
            >
                <i class="ri-whatsapp-line"></i>
            </v-btn>
            <v-btn
                class="ma-1 form__btn-custom"
                color="#00b800"
                height="48"
                width="48"
                :href="`https://social-plugins.line.me/lineit/share?url=${linkURL}`"
                target="_blank"
            >
                <i class="ri-line-line"></i>
            </v-btn>
            <v-btn
                class="ma-1 form__btn-custom"
                color="#37aee2"
                height="48"
                width="48"
                :href="`https://t.me/share/url?url=${linkURL}`"
                target="_blank"
            >
                <i class="ri-telegram-line"></i>
            </v-btn>
            <v-btn
                class="ma-1 form__btn-custom"
                color="#7f7f7f"
                height="48"
                width="48"
                :href="`mailto:?body=${linkURL}`"
                target="_blank"
            >
                <i class="ri-mail-line"></i>
            </v-btn>
        </div>
        <div class="form__field">
            <label>Copy link</label>
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <input
                        type="text"
                        v-model="linkURL"
                        v-bind="attrs"
                        ref="linkURLCopy"
                        @click="onCopyLinkURL(on, $event)"
                        class="form__field-input-custom"
                    />
                </template>
                <span>Text Copied</span>
            </v-tooltip>
        </div>
    </form>
</template>

<script>
import { mapState } from "vuex"
export default {
    name: "ShareSocialForm",
    props: {
        item: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        ...mapState({
            projectDetails: (state) => state.project.projectDetails
        }), 
        
       
    },
    data() {
        return {
            linkURL: "",
            baseUrl : "",
        }
    },
    created(){
       
    },
    mounted(){
        this.getBaseUrl()
        this.checkDetail()

    },
    beforeDestroy() {
        clearTimeout(this._timerId)
    },
    methods: {
        onCopyLinkURL({ mouseenter, mouseleave }, e) {
            clearTimeout(this._timerId)
            mouseenter(e)
            this._timerId = setTimeout(() => mouseleave(e), 1000)
            navigator.clipboard.writeText(this.linkURL)
            const element = this.$refs.linkURLCopy
            element.select()
            element.setSelectionRange(0, 99999)
        },
        getBaseUrl(){
            const url = new URL(window.location.href);
            this.baseUrl = `${url.origin}${url.pathname}`;
            this.linkURL = `${this.baseUrl}/${this.item?.slug}`
        },
        checkDetail(){
            if(!this.item || !this.item.id){
                if(this.projectDetails && this.projectDetails.id){
                this.getBaseUrl()
                    this.linkURL = this.baseUrl
                }else {
                    console.log("else");
                }
            }
            
        }
    },
    watch: {
        item(val) {
            this.getBaseUrl()
        }
    }
}
</script>

<style lang="scss" scoped>
.form--share-social {
    .form__top {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.6rem;
    }
}
.form__field {
    label {
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2rem;
        color: var(--color-label);
        margin-bottom: 0.8rem;
        display: inline-block;
    }
}
.form__btn-custom {
    padding: 0 !important;
    min-width: 4.8rem !important;
    i {
        font-size: 3rem;
        color: var(--color-white);
    }
}
.form__btn-custom {
    padding: 0 !important;
    min-width: 4.8rem !important;
    i {
        font-size: 2.5rem;
        color: var(--color-white);
    }
}
.form__field-input-custom {
    display: block;
    border: 0.1rem solid var(--border-color);
    border-radius: 0.4rem;
    padding: 0.8rem;
    width: 100%;
    &:hover,
    &:active {
        border: 0.1rem solid var(--color-primary);
    }
}
</style>
