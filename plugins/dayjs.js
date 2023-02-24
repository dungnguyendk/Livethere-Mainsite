import customParseFormat from 'dayjs/plugin/customParseFormat'

export default ({ app: { $dayjs } }) => {
    $dayjs.extend(customParseFormat)
}
