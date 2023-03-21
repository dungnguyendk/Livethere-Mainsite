<template>
    <main class="page--projects">
        <HomeSearch @location="onOpenLocationForm($event)"/>
        <ProjectListing/>
        <Dialog 
         :open="isOpenForm" 
         @close="isOpenForm = false" size="medium" 
         :title="typeForm === 'MRT' ? 'Search By MRT' : 'Search By District'"
         :actions="false"
         >
            <template v-if="typeForm === 'MRT'">
                <LocationMRTForm @close="isOpenForm = false"/>
            </template>
            <template v-else>
                <LocationDistrictForm @close="isOpenForm = false"/>
            </template>
        </Dialog>
    </main>
</template>

<script>
import ProjectListing from "~/components/components/Projects/ProjectListing.vue"
import HomeSearch from "~/components/components/Section/Home/HomeSearch.vue"
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import LocationDistrictForm from "~/components/components/Section/components/Form/LocationDistrictForm"
import LocationMRTForm from "~/components/components/Section/components/Form/LocationMRTForm"
export default {
    components: { ProjectListing, HomeSearch, Dialog, LocationDistrictForm, LocationMRTForm },
    head: {
        title: "Livethere"
    },
    data() {
        return {
            isOpenForm: false,
            typeForm: ""
        }
    },
    methods: {
        onOpenLocationForm(e) {
            this.isOpenForm = true
            this.typeForm = e
        },
        onClose() {
            this.isOpenForm = false
        }
    }, 
    
}
</script>

<style lang="scss" scoped>
.page--projects {
    background-color: #fafafa;
}
::v-deep(.section--search) {
    position: relative;
    margin: 0 0 1.6rem;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 0px 0px 80px 80px;
    background-color: var(--color-white);
    overflow: hidden;
    .section--search__form {
        border-radius: 0;
        box-shadow: none;
    }
}
</style>