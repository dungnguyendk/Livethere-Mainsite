<template lang="html">
    <div class="section--project-lanches withBgColor">
        <div class="container">
            <div class="container">
                <div class="section__top">
                    <div class="section__left"> {{ title }}</div>
                    <div class="section__right">
                        <a href="/#post">Read more <i class="ri-arrow-right-s-fill"></i></a>
                    </div>
                </div>
                <div class="section__items">
                    <ProjectLaunches
                        class="items"
                        v-for="item in items"
                        :key="item.index"
                        :item="item"
                    />
                </div>
                <div class="section__read-more">
                    <a href="/#post">Read more <i class="ri-arrow-right-s-fill"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectLaunches from "./components/ProjectLaunches.vue"

export default {
    name: "LandingProjectLaunches",
    components: { ProjectLaunches },
    data() {
        return {
            title: "Project Lanches",
            items: [
                {
                    image: "https://media.istockphoto.com/id/157639696/photo/purple-space-stars.jpg?s=612x612&w=0&k=20&c=fkLtGZxUS9UPlLJUTeGjvvURT0u-vtxvj5sAYbDNrH4=",
                    title: "Beautiful day with Livethere Landlords kekekekekek Beautiful day with Livethere Landlords kekekekekek Beautiful day with Livethere Landlords kekekekekek",
                    day: "18 Jun 22"
                },
                {
                    image: "https://media.istockphoto.com/id/157639696/photo/purple-space-stars.jpg?s=612x612&w=0&k=20&c=fkLtGZxUS9UPlLJUTeGjvvURT0u-vtxvj5sAYbDNrH4=",
                    title: "Beautiful day with Livethere Landlords Beautiful day with Livethere Landlords Beautiful day with Livethere Landlords",
                    day: "18 Jun 22"
                },
                {
                    image: "https://hl-carousel-storage-production.s3-ap-southeast-1.amazonaws.com/originals/1858f616-c75b-4fac-a1b2-e264a1b1d2b4/1645612023-livethere_mohamed-ali-lane_img_1388-slide.webp",
                    title: "Beautiful day with Livethere Landlords Beautiful day with Livethere Landlords Beautiful day with Livethere Landlords",
                    day: "18 Jun 22"
                },
                {
                    image: "https://hl-carousel-storage-production.s3-ap-southeast-1.amazonaws.com/originals/1858f616-c75b-4fac-a1b2-e264a1b1d2b4/1645612023-livethere_mohamed-ali-lane_img_1388-slide.webp",
                    title: "Beautiful day with Livethere Landlords",
                    day: "18 Jun 22"
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.section--project-lanches {
    padding-top: 2.6rem;
    padding-bottom: 2.4rem;

    .section__top {
        align-items: center;
        padding-bottom: 2.4rem;
        justify-content: space-between;
        display: flex;

        .section__left {
            display: flex;
            align-items: center;
            margin-bottom: 0;
            font-family: var(--font-second);
            font-weight: 700;
            font-size: 2rem;
            color: var(--color-primary);
        }

        .section__right {
            display: flex;
            align-items: center;

            // border: solid #e5e5e5;
            a {
                font-family: "Nunito";
                font-style: normal;
                font-weight: 700;
                font-size: 1.6rem;
                line-height: 2.4rem;
                padding-left: 0.5rem;
                color: var(--color-primary);
                padding-right: 0.5rem;
                border-radius: 0.6rem;
                display: flex;
            }

            a:hover {
                color: #e7b242;
            }
        }
    }

    .section__items {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        grid-gap: 1.6rem;
    }

    .section__read-more {
        display: none;
    }

    @media screen and (max-width: 991px) {
        .section__items {
            grid-template-columns: repeat(2, minmax(0, 1fr));

            .items:nth-child(n + 3) {
                display: none;
            }
        }
        .section__top {
            .section__right {
                display: flex;
            }
        }
    }

    @media screen and (max-width: 479px) {
        .section__items {
            grid-template-columns: repeat(1, minmax(0, 1fr));

            .items:nth-child(n + 3) {
                display: none;
            }
        }
        .section__top {
            .section__right {
                display: none;
            }
        }
        .section__read-more {
            display: flex;
            align-items: center;
            justify-content: center;
            // border: solid #e5e5e5;
            a {
                font-family: "Nunito";
                font-style: normal;
                font-weight: 700;
                font-size: 1.6rem;
                line-height: 2.4rem;
                padding-left: 0.5rem;
                color: var(--color-primary);
                padding-right: 0.5rem;
                border-radius: 0.6rem;
                display: flex;
            }

            a:hover {
                color: #e7b242;
            }
        }
    }
}
</style>
