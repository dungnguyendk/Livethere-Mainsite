<template>
    <div class="section__form">
        <div class="form--input">
            <p>Property Type</p>
            <v-text-field outlined dense placeholder="Type here" />
        </div>
        <div class="form--input2">
            <div class="form--input">
                <p>Postal Code</p>
                <v-text-field outlined dense placeholder="Type here" />
            </div>
            <div class="form--input">
                <p>House No.</p>
                <v-text-field outlined dense placeholder="Type here" />
            </div>
        </div>
        <div class="form--input">
            <p>Street Name</p>
            <v-text-field outlined dense placeholder="Type here" />
        </div>
        <div class="form--input">
            <p>Unit No.</p>
            <v-text-field outlined dense placeholder="Type here" />
        </div>
        <div class="form--input">
            <p>Project Name</p>
            <v-text-field outlined dense placeholder="Type here" />
        </div>
        <div class="form--input2">
            <div class="form--input">
                <p>No of Bedroom(s)</p>
                <v-text-field outlined dense placeholder="Type here" />
            </div>
            <div class="form--input">
                <p>Tenure</p>
                <v-text-field outlined dense placeholder="Type here" />
            </div>
        </div>
        <div class="form--input">
            <p>Floor Area (sqft)</p>
            <v-text-field outlined dense placeholder="Type here" />
        </div>
        <div class="form--input">
            <p>Land Area (sqft)</p>
            <v-text-field outlined dense placeholder="Type here" />
        </div>
    </div>
</template>
<script>
export default {
    name: "DialogFormAddNewInventory"
}
</script>
<style lang="scss" scoped>
.section__form {
    padding: 3.2rem 5rem 1rem 5rem;
    display: grid;
    column-gap: 2.4rem;
    grid-template-columns: repeat(2, 1fr);
}

.form--input {
    p {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2rem;
        color: #737373;
        margin-bottom: 0.8rem;
    }
}

.form--input2 {
    display: flex;
    column-gap: 2.4rem;
    grid-template-columns: repeat(2, 1fr);

    p {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2rem;
        color: #737373;
        margin-bottom: 0.8rem;
    }
}

@media only screen and (max-width: 768px) {
    .section__form {
        padding: 3.2rem 3rem 1rem 3rem;
        display: grid;
        column-gap: 2.4rem;
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>