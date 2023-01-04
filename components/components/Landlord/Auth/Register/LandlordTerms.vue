<template lang="html">
    <div class="section__new-registration">
        <h4 class="title__new-registration">New registration</h4>
        <div class="section__form">
            <div class="section__form--term" :class="agreeTerm ? 'agree-term--checked' : ''">
                <p>Landlords Portal Terms of Use:</p>
                <span>
                    Whilst reasonable care is taken to ensure that the information contained on this
                    website is accurate, we cannot guarantee its accuracy and we reserve the right
                    to change the information on this website (including these terms and conditions)
                    at any time without notice. You must check these terms and conditions for
                    changes each time you intend to use this website. Savills provides this website
                    on an "as is" basis and makes no representations or warranties of any kind with
                    respect to this website or the content contained on it (including any text,
                    graphics, advertisements, measurements, links or other item) and disclaims all
                    such representations and warranties. Opinions expressed on this website are not
                    statements of fact. In addition, neither we nor any other contributor to this
                    website make any representation or give any warranty, condition, undertaking or
                    term either express or implied as to the condition, quality, performance,
                    accuracy, suitability, fitness for purpose, completeness, or freedom from
                    viruses of the content contained on this website or that such content will be
                    accurate, up to date, uninterrupted or error free. Nothing on this website shall
                    be regarded or taken as financial advice. The information contained on this
                    website is not an invitation to invest in shares of Savills plc and may not be
                    relied upon in connection with any investment decision. The services listed on
                    this website are only available to persons in the United Kingdom for the
                    following companies: SPF Private Clients Limited, Savills Capital Advisors
                    Limited and Savills Investment Management Limited. Accordingly the information
                    contained about them does not constitute a solicitation to person outside the
                    United Kingdom and must not be acted upon by such persons.
                </span>
            </div>
            <div class="agree-term">
                <v-checkbox
                    v-model="agreeTerm"
                    label="I agree with the Landlord Portal Terms of Use"
                    color="#EDB842"
                    hide-details
                />
            </div>
            <LandlordRegisterForm v-if="agreeTerm" />
        </div>
    </div>
</template>

<script>
import LandlordRegisterForm from "~/components/components/Landlord/Auth/Register/components/Form/LandlordRegisterForm.vue"

export default {
    name: "LandlordTerms",
    components: { LandlordRegisterForm },
    data() {
        return {
            agreeTerm: false
        }
    },
    methods: {
        onRegister() {}
    }
}
</script>
<style lang="scss" scoped>
.section__new-registration {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.agree-term {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2.4rem;
}

.agree-term--checked {
    height: 18.3rem !important;
}

.section__form--term {
    width: 78rem;
    height: 56.5rem;
    border: 1px solid var(--border-color);
    padding: 1.8rem 2rem;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 1.4rem;
    }

    &::-webkit-scrollbar-track {
        background: var(--color-white);
    }

    &::-webkit-scrollbar-thumb {
        border: 0.4rem solid rgba(0, 0, 0, 0);
        background-clip: padding-box;
        border-radius: 100rem;
        background-color: var(--border-color);
    }

    -ms-overflow-style: none;
    scrollbar-width: none;

    p {
        color: var(--color-title-black);
        font-weight: 700;
        font-size: 1.8rem;
        line-height: 2.4rem;
    }

    span {
        color: var(--color-title-black);
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.4rem;
        margin-bottom: 0;
    }
}

.title__new-registration {
    margin: 4.2rem 0 3.2rem 0;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 2.8rem;
    color: var(--color-title-black);
    text-align: center;
}

@media only screen and (max-width: 768px) {
    .section__form--term {
        width: 100%;
    }
}
</style>
