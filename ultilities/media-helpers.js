import { appMedia_img_url } from "~/app-settings"

export const generateFileURL = (filePath, origin = true) => {
    return origin
        ? `${appMedia_img_url.baseURL}/Uploads/${filePath}`
        : `${appMedia_img_url.baseURL}/${filePath}`
}
