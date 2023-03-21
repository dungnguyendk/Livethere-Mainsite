<template>
    <form class="form--district">
        <div class="form__field">
            <label>Select Line or Train Station</label>
            <v-autocomplete
                v-model="stations"
                :items="listStation"
                outlined
                dense
                multiple
            ></v-autocomplete>
        </div>
        <div class="form__footer">
            <div class="form__actions">
                <v-btn class="btn btn--primary btn--gray" @click="onClose">Cancel</v-btn>
                <v-btn class="btn btn--primary btn--green ml-1" @click="onClose">Submit</v-btn>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    name: 'LocationDistrictForm',

    data() {
        return {
            stations: [], 
            listStation: ['East-West Line', 'North-South Line', 'North-East Line', 'Circle Line', 
            'Downtown Line', 
        ], 
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
</style>