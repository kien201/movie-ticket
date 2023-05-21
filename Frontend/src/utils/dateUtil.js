function format(date, format) {
    return format
        .replace('yyyy', date.getFullYear())
        .replace('MM', pad(date.getMonth() + 1))
        .replace('dd', pad(date.getDate()))
        .replace('hh', pad(date.getHours()))
        .replace('mm', pad(date.getMinutes()))
        .replace('ss', pad(date.getSeconds()))
}

function pad(value) {
    const str = String(value)
    return str.length === 1 ? '0' + str : str
}

const DATE_FORMAT = 'dd/MM/yyyy'
const TIME_FORMAT = 'hh:mm'
const DATETIME_FORMAT = 'hh:mm dd/MM/yyyy'

const INPUT_DATE_FORMAT = 'yyyy-MM-dd'
const INPUT_DATETIME_FORMAT = 'yyyy-MM-ddThh:mm'

const dateUtil = { format, DATE_FORMAT, TIME_FORMAT, DATETIME_FORMAT, INPUT_DATE_FORMAT, INPUT_DATETIME_FORMAT }
export default dateUtil
