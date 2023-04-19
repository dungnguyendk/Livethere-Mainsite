<template lang="html">
    <div>
        <div class="image">
            <a href="/#"><img :src="item.image" alt="" /></a>
        </div>
        <div class="title">
            <a href="/#">{{ item.title }}</a>
        </div>
        <div class="day">
            <p>
                {{ item.day }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProjectLaunches",
    props: {
        item: { type: Object, default: null }
    }
}
</script>
<style lang="scss" scoped>
.image {
    position: relative;
    padding-bottom: 61.7%;
    a {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    img {
        border-radius: 1.2rem;
        border: 1px solid #e5e5e5;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-width: 100%;
    }
}

.title {
    min-height: 5rem;
    padding-top: 0.5rem;
    a {
        font-family: "Nunito";
        font-style: normal;
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2.4rem;
        // margin-bottom: 0;
        color: #0b0c0c;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        // line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    a:hover {
        color: var(--color-primary);
    }
}
.day {
    p {
        padding-top: 1rem;
        font-family: "Nunito";
        font-style: normal;
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.4rem;
        //min-height: 20px;
        color: #828586;
    }
}
@media screen and (max-width: 991px) {
    // .title {
    //     min-height: inherit;
    // }
    .day {
        p {
            padding-top: 0.8rem;
        }
    }
}

@media screen and (max-width: 479px) {
    .title {
        min-height: inherit;
    }
    .day {
        p {
            padding-top: 0;
        }
    }
}
</style>
