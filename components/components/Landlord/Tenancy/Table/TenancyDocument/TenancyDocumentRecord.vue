<template lang="html">
    <tr>
        <td data-title="Document Name">
            <p>{{ source.originalFileName ? source.originalFileName : "n/a" }}</p>
        </td>
        <td data-title="Type">
            <p>{{ source.fileTypeName ? source.fileTypeName : "n/a" }}</p>
        </td>
        <td data-title="Actions">
            <div class="actions">
                <v-btn class="btn btn--ghost btn--green btn--sm btn--withIcon" @click="onDownload">
                    <i class="ri-download-cloud-2-line" /><p>Download</p>
                </v-btn>
                <v-btn class="btn btn--ghost btn--red btn--sm btn--withIcon" @click="onDelete">
                    <i class="ri-delete-bin-6-line" /> <p>Remove</p>
                </v-btn>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    name: "TenancyDocumentRecord",

    props: {
        source: {
            type: Object,
            default: () => {}
        },
        documentType: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        onDelete() {
            this.$emit("onDelete", this.source)
        },

        async onDownload() {
            const response = await this.$api.$get(`/api/documents/${this.source.id}/datas`)
            if (response) {
                const link = document.createElement("a")
                link.href = "abc"
                link.setAttribute("download", this.source.originalFileName)
                document.body.appendChild(link)
                window.open(
                    `http://vnapi.asiaesolutions.com/publiccontentapi/api/documents/${this.source.fileID}/datas`
                )
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    grid-gap: 0.4rem;
    gap: 0.4rem;
    p {
        margin-bottom: 0;
    }
}

tr {
    position: relative;
    vertical-align: top;
}

td {
    padding: 3.3rem 2.4rem;
    border-bottom: 1px solid #e5e5e5;
    margin: 0;
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
@media screen and (max-width: 1279px) {
    .actions {
        p {
            margin-bottom: 0;
            font-size: 1.4rem;
        }
    }
}
@media screen and (max-width: 1023px) {
    .actions {
        display: flex;
        justify-content: center;
        p {
            margin-bottom: 0;
            font-size: 1.4;
        }
    }
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
    .actions {
        display: flex;
        justify-content: flex-end;
        p {
            margin-bottom: 0;
            font-size: 0;
        }
    }
}
</style>
