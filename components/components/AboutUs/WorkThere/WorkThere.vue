<template>
    <div class="section--work-there">
        <div class="container">
            <div class="section__content">
                <div class="section__left">
                    <img src="/img/Rectangle 1110.png" alt="" />
                </div>
                <div class="section__right">
                    <img src="/img/logo.png" alt="" />
                    <p>
                        Combining technology with insightful advice, our experts help businesses
                        find the right space to work and grow. Whether you’re looking for a
                        co-working desk, a private office or your own self-contained office, we
                        offer options for all types of individuals and businesses, from start-ups to
                        large-scale corporations.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "WorkThere"
}
</script>

<style lang="scss" scoped>
// .container{
//     background-color: ;
// }
.section--work-there {
    background-color: #ffff;
    .section__content {
        padding: 4.3rem 0;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-gap: 6.8rem;
        align-items: center;

        .section__left {
            img {
                border-radius: 2rem;
            }
        }
        .section__right {
            p {
                padding-top: 1.6rem;
                margin-bottom: 0.8rem;
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2.4rem;
                color: var(--color-title-black);
            }
        }
    }
}
@media screen and (max-width: 768px) {
    .section--work-there {
        .section__content {
            grid-gap: 4rem;
        }
    }
}
@media screen and (max-width: 425px) {
    .section--work-there {
        .section__content {
            grid-gap: 2rem;
            grid-template-columns: repeat(1, minmax(0, 1fr));
        }
    }
}
</style>
