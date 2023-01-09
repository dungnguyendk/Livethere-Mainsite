export const addOneYear = (moment, startDate) => {
    return moment(startDate).add(1, "year").subtract(1, "day").format("DD-MMM-YYYY")
}

export const addTwoYears = (moment, startDate) => {
    return moment(startDate).add(2, "years").subtract(1, "day").format("DD-MMM-YYYY")
}
