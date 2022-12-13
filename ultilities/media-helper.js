export function humanFileSize(size) {
    let i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "KB", "MB", "GB", "TB"][i]
}
// export function renderFileSize(sizeInBytes) {
//     const workingNum = sizeInBytes < 0 ? 0 : sizeInBytes
//     let orderOfMagnitude = 0
//     // below, I am multiplying by 1024^(-orderOfMagnitude);
//     // this is equivalent to dividing by 1024^(orderOfMagnitude);
//     // I did this because it avoids using repeated division or multiplication on one variable, eliminating rounding errors.
//     while (workingNum * Math.pow(1024, -1 * orderOfMagnitude) > 1) {
//         orderOfMagnitude++
//     }
//     // after the above loop, the orderOfMagnitude will be one larger than needed, but still check for 0 incase the file was less than a byte somehow...
//     orderOfMagnitude = orderOfMagnitude === 0 ? 0 : orderOfMagnitude - 1
//     let unit = ""
//     const isUnitFractional = orderOfMagnitude > 0
//     switch (orderOfMagnitude) {
//         case 0:
//             unit = "bytes"
//             break
//         case 1:
//             unit = "Kb"
//             break
//         case 2:
//             unit = "Mb"
//             break
//         case 3:
//             unit = "Gb"
//             break
//         case 4:
//             unit = "Tb"
//             break
//         // no user will submit a file larger than a TB, and we shouldn't process things bigger than a few GB anyway, so not supporting any further cases.
//     }
//     return `${(sizeInBytes * Math.pow(1024, -1 * orderOfMagnitude)).toFixed(
//         isUnitFractional ? 1 : 0
//     )} ${unit}`
// }
