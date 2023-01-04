<template lang="html">
    <div class="panel--landlord panel--upload-file">
        <div class="panel__top">
            <h3>{{ title }}</h3>
        </div>
        <div class="panel__container">
            <Dropzone
                id="DropZone"
                :class="`card--dropzone ${!isNewFile && 'hide-preview'}`"
                ref="dropRef"
                :options="dropzoneOptions"
                :destroyDropzone="false"
                :useCustomSlot="true"
                :include-styling="false"
                v-on:vdropzone-thumbnail="thumbnail"
                v-on:vdropzone-success="(file, response) => onUploadSuccess(file, response)"
            >
                <div class="dropzone--custom">
                    <h4 class="dropzone__heading">
                        <i class="ri-upload-cloud-2-line" />
                        Drop files here or click to upload
                    </h4>
                </div>
            </Dropzone>
        </div>
    </div>
</template>

<script>
import TenancyDocumentTable from "~/components/components/Landlord/Tenancy/Table/TenancyDocument/TenancyDocumentTable.vue"
import Dropzone from "nuxt-dropzone"
import "nuxt-dropzone/dropzone.css"
import { appMedia } from "~/app-settings"
import { mapState } from "vuex"
import { httpEndpoint } from "~/services/https/endpoints"

export default {
    name: "TenancyUploadFilePanel",
    components: { TenancyDocumentTable, Dropzone },
    computed: {
        ...mapState({
            tenancyDetails: (state) => state.tenancy.tenancyDetails
        })
    },
    props: {
        title: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            confirmDialog: false,
            isNewFile: false,
            newFile: null,
            dropzoneOptions: {
                url: `${appMedia.baseURL}/api/documents`,
                thumbnailWidth: 0,
                addRemoveLinks: true,
                maxFiles: 1,
                maxFilesize: 256,
                uploadMultiple: false,
                createImageThumbnails: false,
                disablePreviews: true,
                withCredentials: false,
                headers: {
                    common: {
                        Accept: "text/plain, */*"
                    },
                    LMApiKey: "YWljb2tleW5heW1vaWR1b2N0cnV5Y2FwdmFvZGF5"
                }
            }
        }
    },
    methods: {
        template: function () {
            return `<div class="dz-preview dz-file-preview">
                <div class="dz-image">
                    <div data-dz-thumbnail-bg></div>
                </div>
                <div class="dz-details">
                    <div class="dz-size"><span data-dz-size></span></div>
                    <div class="dz-filename"><span data-dz-name></span></div>
                </div>
                <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                <div class="dz-error-message"><span data-dz-errormessage></span></div>
                <div class="dz-success-mark"></div>
                <div class="dz-error-mark"></div>
                <button class="dz-remove"><span data-dz-remove></span></button>
            </div>
        `
        },

        thumbnail: function (file, dataUrl) {
            let j, len, ref, thumbnailElement
            if (file.previewElement) {
                file.previewElement.classList.remove("dz-file-preview")
                ref = file.previewElement.querySelectorAll("[data-dz-thumbnail-bg]")
                for (j = 0, len = ref.length; j < len; j++) {
                    thumbnailElement = ref[j]
                    thumbnailElement.alt = file.name
                    thumbnailElement.style.backgroundImage = 'url("' + dataUrl + '")'
                }

                return setTimeout(
                    (function (_this) {
                        return function () {
                            return file.previewElement.classList.add("dz-image-preview")
                        }
                    })(this),
                    1
                )
            }
        },

        async onUploadSuccess(file, response) {
            this.$refs.dropRef.removeAllFiles()
            const fileInfo = await this.$api.$get(`${httpEndpoint.documents}/${response.data.id}`)
            if (fileInfo && fileInfo.data) {
                this.$emit("onUpdateDocuments", fileInfo, response.data.id)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.card--dropzone {
    min-height: 12rem;
    padding: 2.4rem;
    border: 1px dashed #e5e5e5;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 0.4rem;

    h4 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        grid-gap: 0.8rem;
        gap: 0.8rem;
        margin-bottom: 0;
        font-size: 1.6rem;
        font-weight: 400;
        color: var(--color-yellow);

        i {
            font-size: 1.8rem;
        }
    }
}
</style>
