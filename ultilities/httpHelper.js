export function computedComboboxData(data, text, value) {
    return data.reduce((newArr, item) => [...newArr, { text: item[text], value: item[value] }], [])
}

export const convertToFormData = (data) => {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
        if (typeof data[key] !== "object") formData.append(key, data[key])
        else formData.append(key, JSON.stringify(data[key]))
    })
    return formData
}
