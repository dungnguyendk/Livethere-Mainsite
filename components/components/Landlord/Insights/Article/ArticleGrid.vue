<template>
    <div class="card--article-grid">
        <div class="card__header">
            <nuxt-link :to="`/projects/${article.slug}`" class="card__title">
                {{ article.projectName }}
            </nuxt-link>
        </div>
        <div class="card__body">
            <nuxt-link :to="`/projects/${article.slug}`" target="_blank">
                <div class="card__image">
                    <template v-if="article.thumbnail">
                        <img :src="article.thumbnail" alt="" />
                    </template>
                    <template v-else>
                        <img src="https://fakeimg.pl/362x384/?text=No%20Image" alt="" />
                    </template>
                </div>
            </nuxt-link>
            <div class="card__content">
                <p>{{ article.description }}</p>
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
            // projectDetails: (state) => state.project.lastestProjects
        })
    },
    created() {
        // console.log("ArticleGrid created", this.article.id)
    },
    methods: {
        async onSearch(article) {
            // console.log(article.id)
            const params = article.id
            // console.log("params: ", params)
            const response = await this.$apiCmsPublic.$get(
                `${
                    httpEndpoint.projects.getProjectListings
                }?projectId=${article.id}&PageNumber=${1}&PageSize=${10}`
            )
            console.log("response: ", response.data);
            if(response?.data){
                this.$router.push(`/projects?${article.projectName}&PageNumber=${1}&PageSize=${10}`)
            }
          
            // this.$store.dispatch("project/searchProjectListing", 10)

            // this.$emit("Seach", article)
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

            img {
                position: absolute;
                z-index: 10;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                max-width: 100%;
                object-fit: cover;
            }
        }
        .card__content {
            padding: 1.4rem 1.6rem 2.2rem;
            p {
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
