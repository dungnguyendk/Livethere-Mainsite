<template lang="html">
    <tr>
        <td data-title="Document Name">
            <p>{{ source.originalFileName ? source.originalFileName : "n/a" }}</p>
        </td>
        <td data-title="Type">
            <p>{{ source.fileTypeName ? source.fileTypeName : "n/a" }}</p>
        </td>
        <td data-title="Leasing Type">
            <!--            <v-btn class="btn btn&#45;&#45;ghost btn&#45;&#45;green btn&#45;&#45;sm btn&#45;&#45;withIcon" @click="onDownload">
                <i class="ri-download-cloud-2-line" /> download
            </v-btn>-->
            <v-btn class="btn btn--ghost btn--red btn--sm btn--withIcon" @click="onDelete">
                <i class="ri-delete-bin-6-line"></i> Remove
            </v-btn>
        </td>
    </tr>
</template>

<script>
import { mapState } from "vuex"

export default {
    name: "TenancyDocumentRecord",

    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        onDelete() {
            this.$store.dispatch("tenancy/deleteTenancyDocument", this.source.id)
        },
        async onDownload() {
            /*const response = await this.$api.$get(`/api/documents/${this.source.id}/datas`)
            if (response) {
                const file = new Blob([response])
                const fileURL = URL.createObjectURL(file)
                const link = document.createElement("a")
                link.href = fileURL
                link.setAttribute("download", this.source.originalFileName)
                document.body.appendChild(link)
                console.log({ link })
                link.click()
                /!*window.open(fileURL)*!/
            }*/
        }
    }
}
</script>
<style lang="scss" scoped>
tr {
    position: relative;
    vertical-align: top;
}

td {
    padding: 3.3rem 2.4rem;
    border-bottom: 1px solid #e5e5e5;

    p {
        display: flex;
        justify-content: left;
        margin-bottom: 0;
        font-family: var(--font-primary);
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #0b0c0c;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}

tr:nth-child(even) {
    background-color: #fafafa;
}

@media screen and (max-width: 768px) {
    tr:nth-child(even) {
        background-color: #fafafa;
    }
    td[data-title] {
        display: grid;
        justify-content: space-between;
        align-items: center;
        text-align: right;
        grid-template-columns: 1fr 1fr;
        grid-gap: 3rem;
        border: none;
        padding: 1.6rem;
        border-top: none;

        &:before {
            content: attr(data-title);
            font-weight: 700;
            color: #0b0c0c;
            font-size: 1.6rem;
            text-align: left;
        }
    }
}
</style>
