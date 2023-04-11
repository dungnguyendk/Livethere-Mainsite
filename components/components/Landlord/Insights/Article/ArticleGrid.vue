<template>
    <div class="card--article-grid">
        <div class="card__header">
            <h3 @click="onSearch(article)" class="card__title">
                {{ article.projectName }}
            </h3>
        </div>
        <div class="card__body">
            <div class="card__image" @click="onSearch(article)">
                <template v-if="article.thumbnail">
                    <img :src="article.thumbnail" alt="" />
                </template>
                <template v-else>
                    <img src="https://fakeimg.pl/374x200/?text=No%20Image" alt="" />
                </template>
            </div>
            <div class="card__content">
                <div class="card__content--desc" v-html="article.description"></div>
                <a @click="onSearch(article)" class="card__button"> Read More</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import qs from "qs"
import { httpEndpoint } from "~/services/https/endpoints"

export default {
    name: "ArticleGrid",
    props: {
        article: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {}
    },
    computed: {
        ...mapState({
            paramsSearch: (state) => state.project.paramsSearch,
        })
    },
    created() {
        // console.log("ArticleGrid created", this.article.id)
    },
    methods: {
        async onSearch(article) {
            // console.log(article.id)
            const newParamsSearch = {
                ...this.paramsSearch,
                ...{ projectId: Number(article.id) }
            }
            const newParamsSearchStringify = qs.stringify(newParamsSearch, { encode: false })
            console.log("response:params", newParamsSearch);
            console.log("response:paramsStringify", newParamsSearchStringify);
            const response = await this.$apiCmsPublic.$get(`${httpEndpoint.projects.getListings}?${newParamsSearchStringify}`)
            console.log("response: ", response);
            if(response?.data){
                // this.$store.commit("project/setParamsSearch", params)
                this.$store.commit("project/setSearchListing",response)
                this.$router.push(`/projects?${newParamsSearchStringify}`)
            }
          

        }
    }
}
</script>

<style lang="scss" scoped>
.card--article-grid {
    background-color: var(--color-white);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .card__header {
        padding: 1.2rem 1.6rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        min-height: 8rem;
        width: 100%;
        justify-content: center;
        .card__title {
            font-weight: 800;
            font-size: 2rem;
            line-height: 2.8rem;
            text-align: center;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            -webkit-box-orient: vertical;
            cursor: pointer;
            &:hover {
                color: var(--color-primary);
            }
        }
    }
    .card__body {
        width: 100%;
        .card__image {
            width: 100%;
            position: relative;
            padding-bottom: 53.4%;
            cursor: pointer;

            img {
                position: absolute;
                z-index: 10;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                max-width: 100%;
                object-fit: cover;
                object-fit: contain;
            }
        }
        .card__content {
            padding: 1.4rem 1.6rem 2.2rem;
            .card__content--desc {
                font-weight: 400;
                font-size: 1.8rem;
                line-height: 2.4rem;
                margin-bottom: 0;
                color: var(--color-black);
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                margin-bottom: 2.2rem;
                min-height: 4.8rem;
                ::v-deep(*) {
                    margin-bottom: 0;
                    font-weight: 400;
                    font-size: 1.8rem;
                    color: var(--color-black);
                    line-height: 2.4rem;
                }
            }
            .card__button {
                cursor: pointer;
                text-decoration: underline;
                font-weight: 700;
                font-size: 1.6rem;
                color: var(--color-primary);
                transition: all 0.25s ease-in;
                &:hover {
                    color: #d97706;
                }
            }
        }
    }
    @media screen and (max-width: 767px) {
        max-width: 42rem;
        margin: 0 auto;
        .card__header {
            .card__title {
                font-size: 1.8rem;
            }
        }
        .card__body {
            .card__content {
                p {
                    font-size: 1.4rem;
                }
                .card__button {
                    font-size: 1.4rem;
                }
            }
        }
    }
}
</style>
