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
                    <div
                        :class="[isShowSearchBarMobile ? 'd-block' : 'mobile-none', 'mrt__sidebar']"
                    >
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
                                    :open.sync="openTree"
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
                    <div
                        :class="[isShowSearchBarMobile ? 'mobile-none' : 'd-block', 'mrt__map']"
                        id="svg-container"
                    >
                        <panZoom>
                            <MrtSingapore />
                        </panZoom>
                    </div>
                    <div class="mrt__tabs-mobile">
                        <div class="tabs__container">
                            <div
                                v-for="tab in listStation"
                                :key="tab.id"
                                :class="[
                                    isShowSearchBarMobile ? 'mobile-none' : 'd-block',
                                    'tabs__item'
                                ]"
                                :style="{ backgroundColor: tab.lineColor }"
                                @click="handleSelectStation(tab)"
                            >
                                {{ tab.id }}
                            </div>
                            <v-btn
                                :class="[
                                    isShowSearchBarMobile ? 'd-block' : 'mobile-none',
                                    'btn btn--primary btn--green'
                                ]"
                                style="margin-left: auto; margin-right: 2.4rem"
                                @click.prevent="isShowSearchBarMobile = false"
                            >
                                Apply
                            </v-btn>
                        </div>
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
            stationListHighlighted: [],
            stationListChecked: [],
            isShowSearchBarMobile: false,
            openTree: []
        }
    },
    computed: {
        ...mapState({
            linesMrt: (state) => state.project.linesMrt,
            paramsSearch: (state) => state.project.paramsSearch
        })
    },
    created() {
        // this.listStation = this.linesMrt
    },
    mounted() {
        this.onFillExistingMrt()
        this.convertListStation()
        this.convertFilteredStations()
        this.mrtMenuHighlight()
        // console.log("convertListStation this.listStation: ,", this.listStation)
    },
    methods: {
        handleSelectStation(tab) {
            this.isShowSearchBarMobile = true
            this.openTree = [tab.id]
        },
        onCheckFutureLines() {},
        onClose() {
            this.$emit("close")
        },
        onFillExistingMrt() {
            if (this.paramsSearch) {
                this.selectedStations = this.paramsSearch.mrt
                    ? this.paramsSearch.mrt.split(";")
                    : []
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
            this.stationListHighlighted = []
            this.stationListChecked = []
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
                ".bp",
                ".sk",
                ".pg",
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
                        const elementsIds = document.querySelectorAll(`[id^=${keyItem}]`)
                        elementsIds.forEach((element) => {
                            element.style.stroke = "none"
                        })
                        console.log("keyItem, ", keyItem)
                        const elements = this.$el.querySelectorAll(".i, .j")
                        elements.forEach((element) => {
                            element.style.fill = "#00953b"
                        })
                        classLine.splice(classLine.indexOf(".i"), 1)
                        classLine.splice(classLine.indexOf(".j"), 1)
                    }
                    if (keyItem === "NS") {
                        const elementsIds = document.querySelectorAll(`[id^=${keyItem}]`)
                        elementsIds.forEach((element) => {
                            element.style.stroke = "none"
                        })
                        const elements = this.$el.querySelectorAll(".x, .y")
                        elements.forEach((element) => {
                            element.style.fill = "#e1251b"
                        })
                        classLine.splice(classLine.indexOf(".x"), 1)
                        classLine.splice(classLine.indexOf(".y"), 1)
                    }
                    if (keyItem === "NE") {
                        const elementsIds = document.querySelectorAll(`[id^=${keyItem}]`)
                        elementsIds.forEach((element) => {
                            element.style.stroke = "none"
                        })
                        const elements = this.$el.querySelectorAll(".t, .u")
                        elements.forEach((element) => {
                            element.style.fill = "#9e28b5"
                        })
                        classLine.splice(classLine.indexOf(".t"), 1)
                        classLine.splice(classLine.indexOf(".u"), 1)
                    }
                    if (keyItem === "CC") {
                        const elementsIds = document.querySelectorAll(`[id^=${keyItem}]`)
                        elementsIds.forEach((element) => {
                            element.style.stroke = "none"
                        })
                        
                        const elements = this.$el.querySelectorAll(".o, .p")
                        elements.forEach((element) => {
                            element.style.fill = "#ff9e18"
                        })
                        
                        classLine.splice(classLine.indexOf(".o"), 1)
                        classLine.splice(classLine.indexOf(".p"), 1)
                        
                    }
                    if (keyItem === "DT") {
                        const elementsIds = document.querySelectorAll(`[id^=${keyItem}]`)
                        elementsIds.forEach((element) => {
                            element.style.stroke = "none"
                        })
                        const elements = this.$el.querySelectorAll(".f, .g")
                        elements.forEach((element) => {
                            element.style.fill = "#0055b8"
                        })
                        classLine.splice(classLine.indexOf(".f"), 1)
                        classLine.splice(classLine.indexOf(".g"), 1)
                    }
                    if (keyItem === "TE") {
                        const elementsIds = document.querySelectorAll(`[id^=${keyItem}]`)
                        elementsIds.forEach((element) => {
                            element.style.stroke = "none"
                        })
                        const elements = this.$el.querySelectorAll(".r, .s")
                        elements.forEach((element) => {
                            element.style.fill = "#9d5918"
                        })
                        classLine.splice(classLine.indexOf(".r"), 1)
                        classLine.splice(classLine.indexOf(".s"), 1)
                    }

                    if (!["EW", "NS", "NE", "CC", "DT", "TE"].includes(keyItem)) {
                        const elements = this.$el.querySelectorAll(".ac, .ad")
                        elements.forEach((element) => {
                            element.style.fill = "#718472"
                        })
                        console.log("elements",elements);
                        classLine.splice(classLine.indexOf(".ac"), 1)
                        classLine.splice(classLine.indexOf(".ad"), 1)
                    }
                })
            }
            console.log("classLine",classLine);
            if (classLine.length < 16 && classLine.length > 0) {
                blurLine(classLine.join(","))
            } else {
                resetColor()
            }
        },
        mrtMenuHighlight() {
            const svgContainer = document.getElementById("svg-container")
            const gs = svgContainer.getElementsByTagName("g")
            for (let i = 0; i < gs.length; i++) {
                gs[i].addEventListener("click", () => {
                    const mrtStationId = gs[i].getAttribute("id")
                    // console.log("mrtStationId",mrtStationId);
                    // check is MRT code
                    if (/^[A-Z]{2}\d{1,2}(_[A-Z0-9]+)?(_[A-Z0-9]+)?$/.test(mrtStationId)) {
                        let mrtStationCode = mrtStationId.replaceAll("_", "/")
                        // console.log("is MRT code",mrtStationCode);
                        // highlighting
                        if (this.stationListHighlighted.includes(mrtStationId)) {
                            // Set normal
                            document.querySelector(`#${mrtStationId}`).style.stroke = ""

                            // remove list in highlight map
                            let idxH = this.stationListHighlighted.indexOf(mrtStationId)
                            this.stationListHighlighted.splice(idxH, 1)

                            // remove list in menu and uncheck
                            let idxS = this.stationListChecked.indexOf(mrtStationCode)
                            this.stationListChecked.splice(idxS, 1)
                            this.selectedStations = this.stationListChecked
                        } else {
                            // console.log("selected mrtStationCode",mrtStationCode)
                            // console.log("selected mrtStationId", mrtStationId)
                            // Highlight map
                            document.querySelector(`#${mrtStationId}`).style.stroke = "currentColor"

                            // add list checked in menu
                            if (!this.stationListChecked.includes(mrtStationCode)) {
                                this.stationListChecked.push(mrtStationCode)

                                this.selectedStations = this.stationListChecked
                            }
                            // add list highlighted map
                            if (!this.stationListHighlighted.includes(mrtStationId))
                                this.stationListHighlighted.push(mrtStationId)
                        }
                    }
                })
            }
        },
        mrtMapHighlight(stationChecked) {
            let stationListToHighlight = []

            // Convert Mrt to code station
            stationChecked.forEach(function (mrtCode) {
                let stationIdOnMap = mrtCode.replaceAll("/", "_")
                stationListToHighlight.push(stationIdOnMap)
            })
            this.stationListChecked = stationChecked
            // console.log("this.stationListHighlighted :",this.stationListHighlighted)
            // console.log("this.stationListChecked :",this.stationListChecked)
            // console.log("stationListToHighlight",stationListToHighlight)

            // Check and remove stations uncheck
            for (let i = this.stationListHighlighted.length - 1; i >= 0; i--) {
                if (!stationListToHighlight.includes(this.stationListHighlighted[i])) {
                    const stationElement = document.querySelector(
                        `g[id='${this.stationListHighlighted[i]}']`
                    )
                    if (stationElement) {
                        stationElement.style.stroke = ""
                    }
                    this.stationListHighlighted.splice(i, 1)
                }
            }

            // Check stations
            stationListToHighlight.forEach((stationId) => {
                // document.querySelector(`g[id='${stationId}']`).style.stroke = "currentColor"
                const stationElement = document.querySelector(`g[id='${stationId}']`)
                if (stationElement) {
                    stationElement.style.stroke = "currentColor"
                }
                if (!this.stationListHighlighted.includes(stationId)) {
                    this.stationListHighlighted.push(stationId)
                }
            })
        }
    },
    watch: {
        selectedStations(val) {
            setTimeout(() => {
                this.onEnableLine(val)
            }, 300)
            // this.initiallyOpen = val
            // console.log("selectedStations", val)
            this.mrtMapHighlight(val)
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
    flex-wrap: nowrap;
    height: 100%;

    @media screen and (max-width: 767px) {
        flex-wrap: wrap;
    }

    .mrt__sidebar {
        flex: 0 0 40rem;
        width: 40rem;
        background-color: var(--bg-color-white);
        padding: 0 2.4rem;

        @media screen and (max-width: 767px) {
            flex: 1;
        }
    }
    .mrt__map {
        overflow: hidden;

        @media screen and (max-width: 767px) {
            height: 100%;
        }

        svg {
            max-width: 100%;
            max-height: 100%;
        }
    }
}
.mrt__tabs-mobile {
    display: none;

    @media screen and (max-width: 767px) {
        display: block;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 6.7rem;
    }

    .tabs {
        &__container {
            display: flex;
            padding: 1.2rem 0;
            background-color: white;
            overflow: auto;

            &::-webkit-scrollbar {
                height: 0.5rem;
            }
        }

        &__item {
            padding: 0.8rem 1.6rem;
            border-radius: 0.8rem;
            min-width: 7rem;
            text-align: center;
            font-size: 1.2rem;
            font-weight: bold;
            color: white;
            background-color: var(--color-primary);
            margin: 0 0.4rem;
        }
    }
}
.mobile-none {
    @media screen and (max-width: 767px) {
        display: none;
    }
}
.form--mrt {
    height: 90vh;

    @media screen and (max-width: 767px) {
        height: 100%;
    }

    .form__footer {
        display: flex;
        justify-content: space-between;
        padding: 2.4rem 2.4rem 3.2rem;
        border-top: 1px solid var(--border-color);

        @media screen and (max-width: 767px) {
            padding: 1.2rem 2.4rem;
        }
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

        @media screen and (max-width: 767px) {
            padding-bottom: 0;
        }

        h4 {
            font-size: 2.4rem;

            @media screen and (max-width: 767px) {
                font-size: 1.8rem;
            }
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
