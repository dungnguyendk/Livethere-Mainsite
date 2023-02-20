<template>
    <div class="card--contact-agent">
        <div class="card__header">
            <h3>contact agent</h3>
        </div>
        <div class="card__content">
            <div class="card__content-avatar">
                <v-avatar size="64">
                    <img :src="imgURLAvatar" alt="" />
                </v-avatar>
            </div>
            <div class="card__content-infor">
                <h3>jocelyn choong</h3>
                <p>Savills Singapore Pte Ltd</p>
                <p>CEA: R044198A</p>
            </div>
        </div>
        <div class="card__features">
            <v-btn class="btn btn--outline btn--green btn-custom" width="74">
                <i class="icon-svg svg-messages"></i>
            </v-btn>
            <v-btn class="btn btn--outline btn--green btn-custom" width="74">
                <i class="icon-svg svg-call-calling"></i>
            </v-btn>
            <v-btn class="btn btn--outline btn--green btn-custom" width="74">
                <i class="icon-svg svg-calendar"></i>

            </v-btn>
            <v-btn class="btn btn--outline btn--green btn-custom" width="74">
                <i class="icon-svg svg-whatsapp"></i>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: "ContactAgentCard",
    data() {
        return {
            imgURLAvatar: "/img/static/contact-agent-avar.jpg"
        }
    }
}
</script>

<style lang="scss" scoped>
.card--contact-agent {
    background-color: var(--color-white);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08);
    border-radius: 2rem;
    background-color: var(--color-white);
    margin-bottom: 2.4rem;
    .card__header {
        padding: 1.7rem 2.4rem 0;
        h3 {
            font-weight: 700;
            font-size: 2rem;
            line-height: 2rem;
            color: #000000;
            text-transform: capitalize;
        }
    }
    .card__content {
        padding: 1rem 2.4rem 2rem;
        display: flex;
        align-items: flex-start;

        .card__content-avatar {
            margin-right: 1.2rem;
            padding-top: 0.7rem;
        }
        .card__content-infor {
            h3 {
                font-weight: 700;
                font-size: 18px;
                line-height: 20px;
                color: var(--color-title-black);
                text-transform: capitalize;
                margin-bottom: 0.8rem;
            }
            p {
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2rem;
                color: var(--color-label);
                margin-bottom: 0.8rem;
            }
        }
    }
    .card__features {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.6rem 2.4rem;
    }
}
.btn-custom{
    &:hover, &:active{
        i{
            background-color: var(--color-white)
        }
    }
}
</style>