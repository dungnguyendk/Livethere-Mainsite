<template lang="html">
    <div class="box--service">
        <div class="box__top">
            <div class="box__topContainer" :style="{ backgroundColor: color }">
                <p> {{ title }}</p>
            </div>
        </div>
        <div class="box__content">
            <div class="box__icon"><img :src="image" alt="" /></div>
            <p>{{ desc }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "SectionService",
    props: {
        title: {
            type: String,
            default: "Untitled"
        },
        color: {
            type: String,
            default: "#E7B242"
        },
        desc: {
            type: String,
            default: "No description"
        },
        image: {
            type: String,
            default: "~/static/img/services/service_1.png"
        }
    }
}
</script>
<style lang="scss" scoped>
.box--service {
    border-radius: 1.4rem;
    border: 1px solid #e5e5e5;

    .box__topContainer {
        height: 3.4rem;
        border-radius: 4rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
            margin-bottom: 0;
            font-family: var(--font-second);
            font-size: 2rem;
            font-weight: 700;
            line-height: 1em;
            color: #fff;
        }
    }

    .box__top {
        padding: 0 3.6rem;

        .box__topContainer {
            position: relative;
            top: -1.7rem;
            margin-bottom: -1.7rem;
        }
    }

    .box__content {
        padding: 2.4rem 1.6rem 1.6rem;
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;

        .box__icon {
            margin-bottom: 1rem;
        }

        p {
            margin-bottom: 0;
            font-size: 1.6rem;
            font-weight: 400;
            line-height: 1.4em;
            color: #0b0c0c;
            text-align: center;
        }
    }
    &:nth-child(2) {
        .box__topContainer {
            background-color: #00634f !important;
        }
    }
    &:nth-child(3) {
        .box__topContainer {
            background-color: #d89889 !important;
        }
    }
    &:nth-child(4) {
        .box__topContainer {
            background-color: #dfc6ff !important;
        }
    }
}
</style>
