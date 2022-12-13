export const sectionGetObjectFromJSON = (jsonData) => {
    return JSON.parse(jsonData).map((field) => {
        return {
            ...field,
            fieldValue: field.fieldValue ? field.fieldValue : ""
        }
    })
}
