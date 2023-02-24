<template lang="html">
    <div class="section--register-benifit">
        <div class="container">
            <h4 class="title__benefits">benefits of registered users</h4>
            <div class="register-benefits">
                <div class="box--register" v-for="item in items" :key="item.id">
                    <div class="box__top">
                        <img :src="require(`~/static/img/${item.icon}.svg`)" alt="" />
                        <span>{{ item.title }}</span>
                    </div>
                    <div class="box__content">
                        <div class="box__content--rule">
                            <p v-for="(content, index) in item.contents" :key="index">
                                <i class="ri-checkbox-circle-fill"></i>{{ content.rule }}
                            </p>
                        </div>
                    </div>
                    <div class="box__bottom">
                        <nuxt-link
                            v-if="item.id === 2"
                            class="btn btn--primary btn--gray v-btn"
                            :to="item.url"
                        >
                            Proceed
                            <i class="ri-arrow-right-line"></i>
                        </nuxt-link>
                        <v-btn v-else class="btn btn--ghost btn--green" disabled>
                            Comming soon
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { REGISTER_BENEFITS } from "~/ultilities/contants/register-benefits.js"

export default {
    name: "LandlordRegisterBenefits",
    data() {
        return {
            items: REGISTER_BENEFITS
        }
    }
}
</script>
<style lang="scss" scoped>
.section--register-benifit {
    padding-bottom: 6.4rem;
}

.title__benefits {
    margin: 4.2rem 0 3.2rem 0;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: var(--color-title-black);
    text-align: center;
}

.register-benefits {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2rem;
    align-items: start;
}

.box--register {
    border: 1px solid var(--color-box-register);
    border-radius: 2rem;
    align-items: center;
}

.box__top {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.2rem 0;

    img {
        height: 4.4rem;
        margin-right: 0.8rem;
    }

    span {
        color: var(--color-box-register);
        font-weight: 800;
        font-size: 20px;
        line-height: 28px;
    }
}

.box__content {
    margin: 2.4rem;

    &--rule {
        border-top: 1px solid var(--border-color);
        border-bottom: 1px solid var(--border-color);
        padding: 2rem 0;
    }

    p {
        display: flex;
        align-items: flex-start;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: var(--color-box-register);
        margin-bottom: 2rem;

        &:last-child {
            margin-bottom: 0;
        }

        i {
            margin-right: 0.4rem;
        }
    }
}

.box__bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2.4rem;
}

@media only screen and (max-width: 768px) {
    .register-benefits {
        grid-template-columns: repeat(1, 1fr);
        row-gap: 2rem;
    }
}
</style>
