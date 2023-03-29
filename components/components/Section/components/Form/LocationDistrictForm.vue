<template>
    <form class="form--district">
        <div class="form__header">
            <div class="form__field">
                <v-text-field 
                    v-model="search"
                    outlined 
                    dense 
                    placeholder="Search district"
                    append-icon="ri-search-line"
                    hide-details
                />
                
            </div>
            <div class="form__field">
                <v-checkbox
                    v-model="checkbox"
                    label="All Districts"
                    hide-details
                    class="mt-1"
                ></v-checkbox>
            </div>
        </div>
        <div class="form__fields">
            <div class="form__field" v-for="item in listStation" :key="item.value">
                <v-checkbox
                    :v-model="item.value"
                    :label="item.text"
                    hide-details
                ></v-checkbox>
            </div>
        </div>
       
        <div class="form__footer">
            <div class="form__actions">
                <v-btn class="btn btn--outline btn--red" text @click="onReset">Reset</v-btn>
            </div>
            <div class="form__actions">
                <v-btn class="btn btn--outline btn--green" @click="onClose">Cancel</v-btn>
                <v-btn class="btn btn--primary btn--green ms-3" @click="onClose">Submit</v-btn>
            </div>
        </div>
    </form>
</template>

<script>
import { DISTRICT_LISTING } from "~/ultilities/contants/district"
export default {
    name: 'LocationDistrictForm',

    data() {
        return {
            stations: [], 
            listStation: DISTRICT_LISTING
        }
    },
    methods: {
        onClose(){
            this.$emit('close');
        }
    },
};
</script>

<style lang="scss" scoped>
.form--district {
    padding-left: 3rem;
    padding-right: 3rem;
    padding-bottom: 3rem;
}
.form__footer {
    padding-top: 2.4rem;
    position: relative;
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: -5.2rem;
        right: -5.2rem;
        height: 1px;
        background-color: var(--border-color);

    }
}
.form__actions{
    display: flex;
    justify-content: flex-end;
}
.form__field{
    label{
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2rem;
        color: var(--color-label);
        margin-bottom: 0.4rem;
    }
}
.form__fields{
    display: grid;
    grid-template-columns: repeat(2, minmax(0,1fr));
    grid-row-gap: 0.4rem;
    padding-bottom: 2.4rem;
    
    max-height: 50vh;
    overflow: auto;

}
.form__header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 1.6rem;

}
.form__footer {
    display: flex;
    justify-content: space-between;
    align-content: center;
}
::-webkit-scrollbar {
    width: 0.5rem;
}

::-webkit-scrollbar-track {
    border-radius: 1rem;
}

::-webkit-scrollbar-thumb {
    background: #bfbfbf;
    border-radius: 1rem;
}
::-webkit-scrollbar-thumb:hover {
    background: #a2a0a0;
}
</style>

