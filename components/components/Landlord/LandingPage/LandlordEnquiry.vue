<template lang="html">
    <div class="section--enquiry-form">
        <div class="container">
            <div class="section__container">
                <div class="section__content">
                    <h3>Maximise your rental income, minus the hassle</h3>
                    <div class="section__form">
                        <EnquiryForm />
                    </div>
                </div>
                <div class="section__image">
                    <img src="~/static/img/landlords/landing-enquiry-bg.jpg" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EnquiryForm from "~/archived/enquiry-form/index.vue"

export default {
    name: "LandlordEnquiry",
    components: { EnquiryForm }
}
</script>
<style lang="scss" scoped>
.section--enquiry-form {
    background-color: #fafafa;
    padding-bottom: 5.2rem;

    .section__content {
        max-width: 50%;
        position: relative;
        z-index: 99;

        padding-top: 3.6rem;

        h3 {
            font-size: 4rem;
            color: var(--color-heading);
            padding-bottom: 1.6rem;
            span {
                font-size: 4rem;
                color: var(--color-heading);
                font-weight: bold;
                display: block;
            }
        }
    }

    .section__image {
        position: absolute;
        top: 0;
        right: 0;
        max-width: 70%;
    }

    .section__form {
        background-color: #fff;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
    }

    .section__container {
        position: relative;
    }
}
</style>
