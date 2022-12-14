<template>
    <div class="section--market-insights">
        <div class="container">
            <div class="section__container">
                <ArticleGrid v-for="article in articles" :key="article.id" :article="article" />
            </div>
        </div>
    </div>
</template>

<script>
import ArticleGrid from "~/components/components/MarketInsights/Article/ArticleGrid.vue"

export default {
    name: "MarketInsights",
    components: {
        ArticleGrid
    },
    data() {
        return {
            articles: [
                {
                    id: 1,
                    urlImage: "https://picsum.photos/600/400.jpg?random=",
                    title: "Closers Group Real Estate",
                    content:
                        "Nestled in the prestigious District 11 at Novena, Soleil @ Sinaran is an award"
                },
                {
                    id: 2,
                    urlImage: "https://picsum.photos/600/400.jpg?random=",
                    title: "Stellar Property Advisors",
                    content: "Nassim Jade is a 10-storey boutique styled freehold development."
                },
                {
                    id: 3,
                    urlImage: "https://picsum.photos/600/400.jpg?random=",
                    title: "Keller Williams Exclusive Properties",
                    content:
                        "Residents at Watermark @ Robertson Quay can enjoy a leisure swim in the pool"
                },
                {
                    id: 4,
                    urlImage: "https://picsum.photos/700/400.jpg?random=",
                    title: "Closers Group Real Estate",
                    content:
                        "Nestled in the prestigious District 11 at Novena, Soleil @ Sinaran is an award"
                },
                {
                    id: 5,
                    urlImage: "https://picsum.photos/500/300.jpg?random=",
                    title: "Stellar Property Advisors",
                    content: "Nassim Jade is a 10-storey boutique styled freehold development."
                },
                {
                    id: 6,
                    urlImage: "https://picsum.photos/600/400.jpg?random=",
                    title: "Keller Williams Exclusive Properties",
                    content:
                        "Residents at Watermark @ Robertson Quay can enjoy a leisure swim in the pool"
                },
                {
                    id: 7,
                    urlImage: "/img/test-01.jpg",
                    title: "Closers Group Real Estate",
                    content:
                        "Nestled in the prestigious District 11 at Novena, Soleil @ Sinaran is an award"
                },
                {
                    id: 8,
                    urlImage: "/img/test-02.jpg",
                    title: "Stellar Property Advisors",
                    content: "Nassim Jade is a 10-storey boutique styled freehold development."
                },
                {
                    id: 9,
                    urlImage: "/img/test-03.jpg",
                    title: "Keller Williams Exclusive Properties",
                    content:
                        "Residents at Watermark @ Robertson Quay can enjoy a leisure swim in the pool"
                },
                {
                    id: 10,
                    urlImage: "/img/test-01.jpg",
                    title: "Closers Group Real Estate",
                    content:
                        "Nestled in the prestigious District 11 at Novena, Soleil @ Sinaran is an award"
                },
                {
                    id: 11,
                    urlImage: "/img/test-02.jpg",
                    title: "Stellar Property Advisors",
                    content: "Nassim Jade is a 10-storey boutique styled freehold development."
                },
                {
                    id: 12,
                    urlImage: "/img/test-03.jpg",
                    title: "Keller Williams Exclusive Properties",
                    content:
                        "Residents at Watermark @ Robertson Quay can enjoy a leisure swim in the pool"
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.section--market-insights {
    .section__container {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        width: 100%;
        grid-gap: 2.4rem;
        margin: 3.2rem auto 8rem;
    }
    @media screen and (max-width: 1023px) {
        .section__container {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
    @media screen and (max-width: 767px) {
        .section__container {
            grid-template-columns: repeat(1, minmax(0, 1fr));
        }
    }
}
</style>
