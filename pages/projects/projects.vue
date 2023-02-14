<template>
    <main>
        <ProjectListingFilterAndSort/>
    </main>
</template>

<script>
import ProjectListingFilterAndSort from '~/components/components/Projects/ProjectListingFilterAndSort'
export default {
    components: {ProjectListingFilterAndSort}, 
    head: {
        title: "Livethere"
    },
}
</script>