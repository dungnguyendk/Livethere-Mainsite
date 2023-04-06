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
                    @input="keySearch(search)"
                />
            </div>
            <div class="form__field">
                <v-checkbox
                    v-model="checkboxAll"
                    label="All Districts"
                    hide-details
                    class="mt-1"
                    @change="onCheckAll()"
                ></v-checkbox>
            </div>
        </div>
        <div class="form__fields">
            <v-list v-if="this.listStation.length > 0">
                <v-list-item-group v-model="districtChecked" multiple @change="onCheckItem()">
                    <template v-for="item in listStation">
                        <v-list-item :key="item.value" :value="item.value">
                            <template v-slot:default="{ active }">
                                <v-list-item-action>
                                    <v-checkbox :input-value="active"></v-checkbox>
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.text"></v-list-item-title>
                                </v-list-item-content>
                            </template>
                        </v-list-item>
                    </template>
                </v-list-item-group>
            </v-list>
            <template v-else>
                <div class="no-result"> Not found </div>
            </template>
        </div>

        <div class="form__footer">
            <div class="form__actions">
                <v-btn class="btn btn--outline btn--red" text @click="onReset">Reset</v-btn>
            </div>
            <div class="form__actions">
                <v-btn class="btn btn--outline btn--green" @click="onClose">Cancel</v-btn>
                <v-btn class="btn btn--primary btn--green ms-3" @click="onSubmit">Submit</v-btn>
            </div>
        </div>
    </form>
</template>

<script>
import { DISTRICT_LISTING } from "~/ultilities/contants/district"
import { mapState } from "vuex"
export default {
    name: "LocationDistrictForm",

    data() {
        return {
            checkboxAll: false,
            search: "",
            districtChecked: [],
            districtCheckedText: [],
            stations: [],
            listStation: DISTRICT_LISTING
        }
    },
    computed: {
        ...mapState({
            paramsSearch: (state) => state.project.paramsSearch,
        })
    },
    created(){
        this.onFillExistingDistrict()
    },
    methods: {
        onClose() {
            this.$emit("close")
        },
        onFillExistingDistrict(){
            if (this.paramsSearch){
                this.districtChecked = this.paramsSearch.districts ? this.paramsSearch.districts.split(";") : []
            }
        },
        onReset() {
            // console.log("districtChecked",this.districtChecked)
            this.districtChecked = []
            this.search = ""
            this.checkboxAll = false
            this.listStation = DISTRICT_LISTING
        },
        onCheckAll() {
            if (this.checkboxAll) {
                this.districtChecked = this.listStation.map((item) => item.value)
            } else {
                this.districtChecked = []
            }
        },
        onCheckItem() {
            const totalItems = this.listStation.length
            const checkedItems = this.districtChecked.length
            this.checkboxAll = checkedItems === totalItems
        },
        keySearch(val) {
            this.listStation = DISTRICT_LISTING.filter((item) => {
                return item.text.toLowerCase().includes(val.toLowerCase())
            })
        },
        onSubmit(){
            // console.log("onsubmit this.districtChecked",this.districtChecked);
            this.$emit("getDistricts",this.districtChecked)
            this.onClose()
        }
    },
    watch: {
        // checkboxAll(val){
        //     console.log("watch checkboxAlla",val)
        // }
    }
}
</script>

<style lang="scss" scoped>
.form--district {
    padding-left: 3rem;
    padding-right: 3rem;
    padding-bottom: 3rem;

    @media screen and (max-width: 767px) {
        padding: 0;
    }
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

        @media screen and (max-width: 767px) {
            left: 0;
            right: 0;
            width: 100%;
        }
    }
    @media screen and (max-width: 767px) {
        padding-top: 1.6rem;
        padding-bottom: 0.4rem;
    }
}
.form__actions {
    display: flex;
    justify-content: flex-end;

    button {
        @media screen and (max-width: 767px) {
            height: 3.6rem !important;
        }
    }
}
.form__field {
    label {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2rem;
        color: var(--color-label);
        margin-bottom: 0.4rem;
    }
    :deep(.v-label) {
        @media screen and (max-width: 767px) {
            font-size: 1.2rem !important;
        }
    }
}
.v-list-item-group {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-row-gap: 0.4rem;

    @media screen and (max-width: 767px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    .v-list-item__title {
        font-size: 1.6rem;
        white-space: normal;

        @media screen and (max-width: 767px) {
            font-size: 1.2rem;
        }
    }
    .v-list-item--active {
        &::before {
            opacity: 0;
        }
    }
    .v-list-item {
        padding-left: 0;
    }
    .v-list-item__action {
        margin-right: 0.8rem;
    }
}
.form__fields {
    padding-bottom: 2.4rem;
    max-height: 50vh;
    min-height: 50vh;
    overflow: auto;
}
.form__header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 1.6rem;

    @media screen and (max-width: 767px) {
        display: block;
    }
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
.no-result {
    text-align: center;
    font-size: 1.8rem;
    padding: 3.2rem;
}
</style>
