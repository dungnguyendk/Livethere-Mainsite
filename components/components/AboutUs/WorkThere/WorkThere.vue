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
                    <div class="btn__work-there">
                        <v-btn class="btn btn-custom btn--primary btn--green btn--md">
                            More about Workthere
                        </v-btn>
                    </div>
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
                max-width: 57.4rem;
            }
        }
        .section__right {
            padding-top: 7.6rem;
            padding-left: 2.4rem;
            p {
                padding-top: 1.6rem;
                margin-bottom: 0.8rem;
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2.4rem;
                color: var(--color-title-black);
            }
            .btn__work-there {
                padding-top: 1.6rem;
            }
            .btn-custom {
                display: inline-block;
                ::v-deep(.v-btn__content) {
                    font-size: 1.6rem !important;
                    font-weight: 700 !important;
                    line-height: 20px !important;
                }
            }
        }
    }
}
@media screen and (max-width: 768px) {
    .section--work-there {
        .section__content {
            grid-gap: 4rem;
            .section__left {
                img {
                    max-width: 37.4rem;
                }
            }
        }
        .btn__work-there {
            display: flex;
            justify-content: center;
        }
    }
}
@media screen and (max-width: 425px) {
    .section--work-there {
        .section__content {
            grid-gap: 2rem;
            grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        .btn__work-there {
            display: flex;
            justify-content: center;
        }
    }
}
</style>
