<template>
    <form class="form--share-social">
        <div class="form__top">
            <v-btn class="ma-1 form__btn-custom" color="#3b5998" height="48" width="48" href="https://www.facebook.com/" target="_blank">
                <i class="ri-facebook-fill"></i>
            </v-btn>
            <v-btn class="ma-1 form__btn-custom" color="#25d366" height="48" width="48" href="https://www.whatsapp.com/" target="_blank">
                <i class="ri-whatsapp-line"></i>
            </v-btn>
            <v-btn class="ma-1 form__btn-custom" color="#00b800" height="48" width="48" href="https://line.me/en/" target="_blank">
                <i class="ri-line-line"></i>
            </v-btn>
            <v-btn class="ma-1 form__btn-custom" color="#37aee2" height="48" width="48" href="https://telegram.org/" target="_blank">
                <i class="ri-telegram-line"></i>
            </v-btn>
            <v-btn class="ma-1 form__btn-custom" color="#7f7f7f" height="48" width="48" href="https://mail.google.com/mail/u/0/#inbox" target="_blank">
                <i class="ri-mail-line"></i>
            </v-btn>
        </div>
        <div class="form__field">
            <label>Copy link</label>
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        outlined
                        dense
                        placeholder="https://www.livethere.com/listing/eden-residences-capitol-129"
                        class="form__field-text-field-custom"
                        v-model="linkURL"
                        v-bind="attrs"
                        @click="onCopyLinkURL(on, $event)"
                    >
                    </v-text-field>
                </template>
                <span>Text Copied</span>
            </v-tooltip>
        </div>
    </form>
</template>

<script>
export default {
    name: "ShareSocialForm",
    props: {
        item: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            linkURL: this.item.linkDetails
        }
    },
    beforeDestroy() {
        clearTimeout(this._timerId)
    },
    methods: {
        onCopyLinkURL({ mouseenter, mouseleave }, e) {
            clearTimeout(this._timerId)
            mouseenter(e)
            this._timerId = setTimeout(() => mouseleave(e), 1000)
            navigator.clipboard.writeText(this.linkURL);
        }
    }, 
    watch: {
        item(val){
            this.linkURL = val.linkDetails
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
        }
}
.form__btn-custom{
    padding: 0 !important;
    min-width: 4.8rem !important;
    i{
        font-size: 3rem;
        color: var(--color-white)
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
.form__field-text-field-custom {
    ::v-deep(.v-text-field__details) {
        display: none;
    }
}
</style>
