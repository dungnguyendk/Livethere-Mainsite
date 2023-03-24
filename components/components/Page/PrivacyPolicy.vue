<template>
    <div class="page--privacy-policy">
        <PolicyTermsBanner>{{ title }}</PolicyTermsBanner>
        <div class="container">
            <div v-html="dummyData" class="page__wrapper"></div>
        </div>
    </div>
</template>

<script>
import { PRIVACY_POLICY } from "~/ultilities/contants/dummy-data"
import PolicyTermsBanner from '~/components/components/Page/components/Banner/PolicyTermsBanner.vue'
export default {
    name: "PrivacyPolicy",
    components: {PolicyTermsBanner},
    data() {
        return {
            dummyData: PRIVACY_POLICY.data, 
            title: 'privacy policy'
        }
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
:deep(.page__wrapper) {
    ol {
        counter-reset: title;
        list-style-type: none;
        padding-left: 0;
        li {
            padding: 3.2rem 0;

            h4 {
                font-weight: 800;
                font-size: 2rem;
                line-height: 2.8rem;
                color: var(--color-menu);
                margin-bottom: 1.6rem;
                &::before {
                    font-size: 2rem;
                    font-weight: 800;
                    line-height: 2.8rem;
                    color: var(--color-menu);
                    counter-increment: title;
                    content: counters(title, ".") ". ";
                }
            }
            p{
                margin-bottom: 2.4rem;
            }

            ol {
                counter-reset: title;
                list-style-type: none;
                padding-left: 0;
            }
            ol li {
                padding: 0;
                p {
                    margin-bottom: 2.4rem;
                    font-weight: 400;
                    font-size: 1.6rem;
                    line-height: 2.4rem;
                    color: var(--color-title-black);
                    display: grid;
                    grid-template-columns: 1fr 22fr;
                    &::before {
                        counter-increment: title;
                        content: counters(title, ".") ". ";
                        font-weight: 700;
                    }
                }
                div > ul{

                    margin-bottom: 2.4rem;
                    padding-left: 7rem;
                    list-style-type: disc;
                }
            }
            ol li{
                div > ul{
                    margin-top: -2.4rem;
                }
            }
            ol li:last-child {
                p {
                    margin-bottom: 0;
                }
                div > ul{
                    margin-top: 0;
                }
            }
            ul{
                margin-top: -2.4rem;
                padding-left: 7rem;
                margin-bottom: 2.4rem;
                li{
                    padding: 0;
                }
                p:last-child{
                    margin-bottom: 0;
                }
            }

            
            
        }
        hr {
            margin: 0;
        }
    }
    hr {
        margin: 0;
    }
    p {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--color-title-black);
        margin-bottom: 3.2rem;
    }
    @media screen and(max-width: 767px){
        p{
            text-align: justify;
        }
    }
}
</style>