function format(date, format) {
    date = convertToDate(date)
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

function convertToDate(date) {
    if (typeof date === 'string') return new Date(date)
    if (!(date instanceof Date)) return new Date()
    return new Date(date)
}

function add(date, duration, type) {
    date = convertToDate(date).getTime()
    switch (type) {
        case addType.DAYS:
            return new Date(date + 86400000 * duration)
        case addType.HOURS:
            return new Date(date + 3600000 * duration)
        case addType.MINUTES:
            return new Date(date + 60000 * duration)
        case addType.SECONDS:
            return new Date(date + 1000 * duration)
        default:
            return new Date(date + duration)
    }
}

function getMonday(d) {
    d = convertToDate(d)
    const day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(d.setDate(diff))
}

const addType = Object.freeze({
    DAYS: 'DAYS',
    HOURS: 'HOURS',
    MINUTES: 'MINUTES',
    SECONDS: 'SECONDS',
})

const DATE_FORMAT = 'dd/MM/yyyy'
const TIME_FORMAT = 'hh:mm'
const DATETIME_FORMAT = 'hh:mm dd/MM/yyyy'

const INPUT_DATE_FORMAT = 'yyyy-MM-dd'
const INPUT_DATETIME_FORMAT = 'yyyy-MM-ddThh:mm'

const dateUtil = {
    format,
    add,
    pad,
    getMonday,
    addType,
    DATE_FORMAT,
    TIME_FORMAT,
    DATETIME_FORMAT,
    INPUT_DATE_FORMAT,
    INPUT_DATETIME_FORMAT,
}
export default dateUtil
