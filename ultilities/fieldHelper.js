import {mediaSettings} from "~/app-settings";

export const getStringByFieldName = (rawData, fieldName) => {
    return rawData.find(field => field.fieldName === fieldName)?.fieldValue !== '' ? rawData.find(field => field.fieldName === fieldName)?.fieldValue : ''
}

export const getImageURLByFieldName = (rawData, fieldName) => {
    const URL = rawData.find(field => field.fieldName === fieldName)?.fieldValue !== '' ? rawData.find(field => field.fieldName === fieldName)?.fieldValue : ''
    return URL !== '' ? `${mediaSettings.baseURL}/${URL}` : ''
}
