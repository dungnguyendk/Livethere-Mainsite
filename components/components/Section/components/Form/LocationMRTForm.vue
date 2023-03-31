<template>
    <form class="form--mrt">
        <div class="card--dialog">
            <div class="card__header">
                <h4>Search by MRT</h4>
                <button class="btn--close" @click="onClose()">
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
                                class="mt-1"
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
                                @input="keySearch(search)"
                            />
                        </div>
                        <div class="form__field--stations">
                            <v-list>
    <v-list-group
      v-for="line in listStation"
      :key="line.lineCode"
      :value="line.lineCode"
      no-action
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>
            <v-checkbox
              v-model="line.lineChecked"
              @change="checkAllStations(line, $event)"
            />
            {{ line.lineName }}
          </v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item
        v-for="station in line.stations"
        :key="station.stationCode"
        :value="station.stationCode"
      >
        <v-list-item-action>
          <v-checkbox
            v-model="checkedStations[station.stationName]"
            :value="station.stationName"
          ></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ station.stationCode }} {{ station.stationName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
    <v-btn color="primary" @click="onSubmit">Submit</v-btn>
  </v-list>
                        </div>
                    </div>
                    <div class="mrt__map">
                        <MrtSingapore />
                    </div>
                </div>
            </div>
            <div class="card__actions">
                <div class="form__footer">
                    <div class="form__actions">
                        <v-btn class="btn btn--outline btn--red" text @click="onReset">Reset</v-btn>
                    </div>
                    <div class="form__actions">
                        <v-btn class="btn btn--outline btn--green" @click="onClose">Cancel</v-btn>
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
import { mapState } from "vuex"
export default {
    name: "LocationMRTForm",
    components: {
        MrtSingapore
    },

    data() {
        return {
            selectedLines: [],
            selectedStations: [],
            futureLines: false,
            listStation: [],
            searchStation: "",
            cbFutureLines: false,
            checkedStations: {},
      lineChecked: false
        }
    },
    computed: {
        ...mapState({
            linesMrt: (state) => state.project.linesMrt
        })
    },
    created() {
        this.listStation = this.linesMrt
    },
    mounted() {},
    methods: {
        onClose() {
            this.$emit("close")
        },
        onCheckFutureLines() {},
        keySearch() {},
        onReset() {
            this.futureLines = false
            this.searchStation = ""
            // this.stations = [],
        },
        checkAllStations(line, event) {
  const newLine = { ...line };
  newLine.lineChecked = event.target.checked;
  if (newLine.lineChecked) {
    newLine.stations.forEach(station => {
      this.$set(this.checkedStations, station.stationName, true);
    });
  } else {
    newLine.stations.forEach(station => {
      this.$set(this.checkedStations, station.stationName, false);
    });
  }
  const index = this.listStation.indexOf(line);
  this.$set(this.listStation, index, newLine);
},
    onSubmit() {
      const selectedStations = this.checkedStations;
      console.log(selectedStations);
      // Do something with the selected stations
    },
    }
}
</script>

<style lang="scss" scoped>
.EW-line-color {
    color: #009437;
}
.DT-line-color {
    color: #0051b7;
}
.TE-line-color {
    color: #9e5a1c;
}
.JR-line-color {
    color: #00adbc;
}
.mrt__search-content {
    display: flex;
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
    }
}
.form--mrt {
    .form__footer {
        display: flex;
        justify-content: space-between;
        padding: 2.4rem 2.4rem 3.2rem;
        border-top: 1px solid var(--border-color);
    }
}
.card--dialog {
    .card__header {
        justify-content: center;
        padding-top: 3.2rem;
        padding-bottom: 2.4rem;
        position: relative;
        display: flex;
        h4 {
            font-size: 2.4rem;
        }
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
</style>
