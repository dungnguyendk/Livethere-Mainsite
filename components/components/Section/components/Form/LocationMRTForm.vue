<template>
    <form class="form--mrt">
        <div class="card--dialog">
            <div class="card__header">
                <h4>Search by MRT</h4>
                <button class="btn--close" @click.prevent="onClose()">
                    <i class="ri-close-fill" />
                </button>
            </div>
            <div class="card__content">
                <div class="mrt__search-content">
                    <div class="mrt__sidebar">
                        <div class="form__field border-bottom">
                            <v-checkbox
                                v-model="cbFutureLines"
                                label="Future Lines"
                                hide-details
                                class="mt-0 pt-0"
                                @change="onCheckFutureLines()"
                            ></v-checkbox>
                        </div>
                        <div class="form__field">
                            <v-text-field
                                v-model="searchStation"
                                outlined
                                dense
                                placeholder="Search station name..."
                                append-icon="ri-search-line"
                                hide-details
                                @input="keySearch(searchStation)"
                            />
                        </div>
                        <div class="form__field--stations">
                            <template v-if="searchStation">
                                <v-list v-if="this.searchStations.length > 0">
                                    <v-list-item-group v-model="selectedStations" multiple>
                                        <template v-for="item in searchStations">
                                            <v-list-item
                                                :key="item.stationCode"
                                                :value="item.stationCode"
                                            >
                                                <template v-slot:default="{ active }">
                                                    <v-list-item-action>
                                                        <v-checkbox
                                                            :input-value="active"
                                                        ></v-checkbox>
                                                    </v-list-item-action>
                                                    <v-list-item-content>
                                                        <v-list-item-title
                                                            v-text="item.stationName"
                                                        ></v-list-item-title>
                                                    </v-list-item-content>
                                                </template>
                                            </v-list-item>
                                        </template>
                                    </v-list-item-group>
                                </v-list>
                            </template>
                            <template v-else>
                                <v-treeview
                                    v-model="selectedStations"
                                    :items="listStation"
                                    selectable
                                    activatable
                                    open-on-click
                                    class="tree--station"
                                >
                                    <template v-slot:prepend="{ item, open }">
                                        <template v-if="item.children && item.children.length">
                                            <v-chip
                                                :color="item.lineColor"
                                                label
                                                text-color="white"
                                                small
                                                class="tree--station__tag"
                                            >
                                                {{ item.id }}
                                            </v-chip>
                                            <v-icon class="tree--station__arrow">
                                                {{
                                                    open
                                                        ? "ri-arrow-up-s-line"
                                                        : "ri-arrow-down-s-line"
                                                }}
                                            </v-icon>
                                        </template>
                                    </template>
                                </v-treeview>
                            </template>
                        </div>
                    </div>
                    <div class="mrt__map">
                        <panZoom>
                            <MrtSingapore />
                        </panZoom>
                    </div>
                </div>
            </div>
            <div class="card__actions">
                <div class="form__footer">
                    <div class="form__actions">
                        <v-btn class="btn btn--outline btn--red" text @click="onReset">Reset</v-btn>
                    </div>
                    <div class="form__actions">
                        <v-btn class="btn btn--outline btn--green" @click.prevent="onClose"
                            >Cancel</v-btn
                        >
                        <v-btn class="btn btn--primary btn--green ms-3" @click="onSubmit"
                            >Submit</v-btn
                        >
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import MrtSingapore from "~/components/shared/Icon/MrtSingapore.vue"
import { blurLine, resetColor } from "~/ultilities/mrt"
import { mapState } from "vuex"
export default {
    name: "LocationMRTForm",
    components: {
        MrtSingapore
    },

    data() {
        return {
            futureLines: false,
            listStation: [],
            searchStation: "",
            cbFutureLines: false,
            selectedStations: [],
            filterStations: [],
            searchStations: [],
            activeNode: [],
            selectedIds: []
        }
    },
    computed: {
        ...mapState({
            linesMrt: (state) => state.project.linesMrt,
            paramsSearch: (state) => state.project.paramsSearch,
        })
    },
    created() {
        // this.listStation = this.linesMrt
    },
    mounted() {
        this.onFillExistingMrt()
        this.convertListStation()
        this.convertFilteredStations()
        // console.log("convertListStation this.listStation: ,", this.listStation)
    },
    methods: {
        onClose() {
            this.$emit("close")
        },
        onFillExistingMrt(){
            if (this.paramsSearch){
                this.selectedStations = this.paramsSearch.mrt ? this.paramsSearch.mrt.split(";") : []
            }
        },
        keySearch(val) {
            this.searchStations = this.filterStations.filter((item) => {
                return item.stationName.toLowerCase().includes(val.toLowerCase())
            })
        },
        onReset() {
            this.futureLines = false
            this.selectedStations = []
            this.searchStation = ""
            // this.stations = [],
        },
        convertListStation() {
            this.listStation = this.linesMrt.map((line) => ({
                name: line.lineName,
                id: line.lineCode,
                lineColor: line.lineColor,
                children: line.stations.map((station) => ({
                    id: station.stationCode,
                    name: `${station.stationCode} ${station.stationName}`,
                    stationColor: station.stationColor,
                    latitude: station.latitude,
                    longitude: station.longitude,
                    parentID: line.lineCode
                }))
            }))
        },
        convertFilteredStations() {
            this.filterStations = this.linesMrt.reduce((acc, line) => {
                line.stations.forEach((station) => {
                    const existingStation = acc.find((s) => s.stationCode === station.stationCode)
                    if (!existingStation) {
                        acc.push({
                            stationCode: station.stationCode,
                            stationName: `${station.stationCode} ${station.stationName}`,
                            stationColor: station.stationColor,
                            latitude: station.latitude,
                            longitude: station.longitude
                        })
                    }
                })
                return acc
            }, [])
        },

        onSubmit() {
            // const selectedStations = this.listStation
            // console.log(this.selectedStations)
            this.$emit("getMrt", this.selectedStations)
            this.onClose()
        },
        onEnableLine(item) {
            const classLine = [
                ".i",
                ".j",
                ".x",
                ".y",
                ".t",
                ".u",
                ".o",
                ".p",
                ".f",
                ".g",
                ".r",
                ".s",
                ".ac",
                ".ad",
                ".ab",
                ".ag"
            ]
            const selectedNodes = document.querySelectorAll(".v-treeview-node--selected")
            const selectedIds = []
            selectedNodes.forEach((node) => {
                if (node.classList.contains("v-treeview-node--selected")) {
                    const tagEl = node.querySelector(".tree--station__tag")
                    if (tagEl) {
                        selectedIds.push(tagEl.textContent.trim())
                    }
                }
            })
            if (selectedIds) {
                selectedIds.forEach((keyItem) => {
                    if (keyItem === "EW") {
                        const elements = this.$el.querySelectorAll(".i, .j")
                        elements.forEach((element) => {
                            element.style.fill = "#00953b"
                        })
                        classLine.splice(classLine.indexOf(".i"), 1)
                        classLine.splice(classLine.indexOf(".j"), 1)
                    }
                    if (keyItem === "NS") {
                        const elements = this.$el.querySelectorAll(".x, .y")
                        elements.forEach((element) => {
                            element.style.fill = "#e1251b"
                        })
                        classLine.splice(classLine.indexOf(".x"), 1)
                        classLine.splice(classLine.indexOf(".y"), 1)
                    }
                    if (keyItem === "NE") {
                        const elements = this.$el.querySelectorAll(".t, .u")
                        elements.forEach((element) => {
                            element.style.fill = "#9e28b5"
                        })
                        classLine.splice(classLine.indexOf(".t"), 1)
                        classLine.splice(classLine.indexOf(".u"), 1)
                    }
                    if (keyItem === "CC") {
                        const elements = this.$el.querySelectorAll(".o, .p")
                        elements.forEach((element) => {
                            element.style.fill = "#ff9e18"
                        })
                        classLine.splice(classLine.indexOf(".o"), 1)
                        classLine.splice(classLine.indexOf(".p"), 1)
                    }
                    if (keyItem === "DT") {
                        const elements = this.$el.querySelectorAll(".f, .g")
                        elements.forEach((element) => {
                            element.style.fill = "#0055b8"
                        })
                        classLine.splice(classLine.indexOf(".f"), 1)
                        classLine.splice(classLine.indexOf(".g"), 1)
                    }
                    if (keyItem === "TE") {
                        const elements = this.$el.querySelectorAll(".r, .s")
                        elements.forEach((element) => {
                            element.style.fill = "#9d5918"
                        })
                        classLine.splice(classLine.indexOf(".r"), 1)
                        classLine.splice(classLine.indexOf(".s"), 1)
                    }
                    if (!["EW", "NS", "NE", "QC", "DT", "TE"].includes(keyItem)) {
                        const elements = this.$el.querySelectorAll(".ac, .ad")
                        elements.forEach((element) => {
                            element.style.fill = "#718472"
                        })
                        classLine.splice(classLine.indexOf(".ac"), 1)
                        classLine.splice(classLine.indexOf(".ad"), 1)
                    }
                })
            }

            if (classLine.length < 16) {
                blurLine(classLine.join(","))
            } else {
                resetColor()
            }
        },
    },
    watch: {
        selectedStations(val) {
            setTimeout(() => {
                this.onEnableLine(val)
            },300)
            // this.initiallyOpen = val
            // console.log("selectedStations", this.selectedStations)
            
        }
    }
}
</script>

<style lang="scss" scoped>
.v-list-item-group {
    .v-list-item__title {
        font-size: 1.6rem;
        white-space: normal;
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
.tree--station {
    :deep(.v-treeview-node__toggle) {
        display: none;
    }
    :deep(.v-treeview-node__root) {
        padding-left: 0;
    }
    :deep(.v-treeview-node__prepend) {
        min-width: unset;
    }
    :deep(.v-treeview-node__checkbox) {
        color: var(--border-color) !important;
        caret-color: var(--border-color) !important;
    }
    :deep(.v-treeview-node__checkbox.accent--text) {
        color: var(--color-dark-yellow) !important;
        caret-color: var(--color-dark-yellow) !important;
    }
    ::v-deep(.v-treeview-node__level) {
        width: 15px;
    }
    .tree--station__arrow {
        position: absolute;
        top: 50%;
        right: 0.6rem;
        transform: translate(0, -50%);
    }
    .tree--station__tag {
        text-align: center;
        font-size: 1.2rem;
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 0.4rem;
        padding: 0;
        justify-content: center;
    }
}
.mrt__search-content {
    display: flex;
    height: 100%;
    .mrt__sidebar {
        flex: 0 0 40rem;
        max-width: 40rem;
        background-color: var(--bg-color-white);
        padding: 0 2.4rem;
    }
    .mrt__map {
        flex-basis: 0;
        flex-grow: 1;
        max-width: 100%;
        overflow: hidden;
        svg {
            max-width: 100%;
            max-height: 100%;
        }
    }
}
.form--mrt {
    height: 90vh;
    .form__footer {
        display: flex;
        justify-content: space-between;
        padding: 2.4rem 2.4rem 3.2rem;
        border-top: 1px solid var(--border-color);
    }
}
.card--dialog {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    .card__header {
        justify-content: center;
        padding: 2.2rem 0;
        position: relative;
        display: flex;
        flex-shrink: 0;
        h4 {
            font-size: 2.4rem;
        }
    }
    .card__content {
        flex-grow: 1;
        overflow: auto;
    }
    .card__actions {
        flex-shrink: 0;
    }
    .btn--close {
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: none;
        width: 2.667rem;
        height: 2.667rem;
        border-radius: 50%;
        border: 1.5px solid var(--color-label);
        position: absolute;
        top: 2rem;
        right: 3.2rem;
        left: auto;
        transition: all 0.4s ease;
        &:hover {
            background-color: hsla(
                var(--color-red-h),
                var(--color-red-s),
                var(--color-red-l),
                var(--level-1)
            );
        }
        i {
            font-size: 2rem;
        }
    }
}
.form__field--stations {
    max-height: calc(100% - 72px - 58px);
    overflow: auto;
}
.form__field {
    padding: 1.6rem 0;
    .v-text-field {
        background-color: white;
        :deep(input) {
            font-size: 1.6rem;
            color: var(--color-title-black);
            &::placeholder {
                font-size: 1.6rem;
                color: var(--color-title-black);
            }
        }
    }
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
