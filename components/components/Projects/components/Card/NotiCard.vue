<template>
    <div class="card--noti">
        <div class="card__header">
            <h3>Inspections are still happening.</h3>
        </div>
        <div class="card__content">
            <p
                >Open homes and inspections may not be permitted in restricted areas. Please reach
                out to the agent to find out if private inspections are allowed in this area.</p
            >
        </div>
    </div>
</template>

<script>
export default {
    name: "NotiCard",

    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.card--noti {
    background-color: var(#edb842, 0.08);
    border-radius: 0.8rem;
    padding: 1.2rem 2.4rem;
    .card__header {
    
        h3 {
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: #edb842;
            margin-bottom: 1rem;
      
        }
    }
    .card__content {
        p {
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: #edb842;
            margin-bottom: 0;

        }
    }
}
</style>