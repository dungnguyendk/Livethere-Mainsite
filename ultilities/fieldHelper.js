export const getStringByFieldName = (rawData, fieldName) => {
    return rawData.find((field) => field.fieldName === fieldName)?.fieldValue !== ""
        ? rawData.find((field) => field.fieldName === fieldName)?.fieldValue
        : ""
}
export const getMetadataByFieldName = (rawData, fieldName) => {
    return rawData.find((field) => field.fieldName === fieldName)?.metadata !== ""
        ? rawData.find((field) => field.fieldName === fieldName)?.metadata
        : ""
}
export const getBooleanFieldValue = (rawData, fieldName) => {
    const { fieldValue } = rawData.find((field) => field.fieldName === fieldName) ?? {}
    return !(fieldValue !== "" && fieldValue === "false")
}

export const getImageURLByFieldName = (rawData, fieldName) => {
    const URL =
        rawData.find((field) => field.fieldName === fieldName)?.fieldValue !== ""
            ? rawData.find((field) => field.fieldName === fieldName)?.fieldValue
            : ""
    return URL !== "" ? URL : ""
}

export const getComponentFieldData = (data, fieldName) => {
    const componentArr = data.find((s) => s.fieldName === fieldName)

    if (componentArr?.fieldValue) {
        const componentRaw = JSON.parse(componentArr.fieldValue)
        return componentRaw.length > 0 ? componentRaw : []
    }

    return []
}
