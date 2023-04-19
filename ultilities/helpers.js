export function sortByOrder(a, b) {
    if (a.order < b.order) return -1
    if (a.order > b.order) return 1
    return 0
}

export function convertNumberToCommas(payload) {
    if (payload === 0) return "0"
    return !isNaN(payload) ? payload.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
}

export function convertCommasToNumber(payload) {
    if (payload === 0) return 0
    return parseFloat(payload.toString().replace(/[^0-9.]+/g, ""))
}
