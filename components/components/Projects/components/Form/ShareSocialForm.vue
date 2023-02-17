<template>
    <form class="form--share-social">
        <div class="form__top">
            <v-btn class="ma-1 form__btn-custom" color="primary" large height="60">
                <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn class="ma-1 form__btn-custom" color="primary" large height="60">
                <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn  class="ma-1 form__btn-custom" color="primary" large height="60">
                <v-icon>mdi-snapchat</v-icon>
            </v-btn>
            <v-btn  class="ma-1 form__btn-custom" color="primary" large height="60">
                <v-icon>mdi-gmail</v-icon>
            </v-btn>
            <v-btn class="ma-1 form__btn-custom" color="primary" large height="60">
                <v-icon>mdi-whatsapp</v-icon>
            </v-btn>
        </div>
        <div class="form__field">
            <label>Copy link</label>
            <v-text-field
                outlined
                dense
                placeholder="https://www.livethere.com/listing/eden-residences-capitol-129"
            >
            </v-text-field>
        </div>
    </form>
</template>

<script>
export default {
    name: "ShareSocialForm",

    data() {
        return {}
    },

    mounted() {},

    methods: {}
}
</script>

<style lang="scss" scoped>
.form--share-social {
    padding: 0 2.6rem 2.2rem;
    .form__top {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
    }
}
.form__field {
        label {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2rem;
            color: var(--color-label);
            margin-bottom: 0.8rem;
        }
}
.form__btn-custom{
    padding: 1.5rem;
    i{
        font-size: 3.6rem;
    }
}
</style>