function format(date, format) {
    return format
        .replace('yyyy', date.getFullYear())
        .replace('MM', pad(date.getMonth() + 1))
        .replace('dd', pad(date.getDate()))
        .replace('HH', pad(date.getHours()))
        .replace('mm', pad(date.getMinutes()))
        .replace('ss', pad(date.getSeconds()))
}

function pad(value) {
    const str = String(value)
    return str.length === 1 ? '0' + str : str
}

const dateUtil = { format }
export default dateUtil
