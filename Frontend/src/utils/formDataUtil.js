function getFormData(object) {
    const formData = new FormData()
    for (const key in object) {
        formData.append(key, object[key])
    }
    return formData
}

const formDataUtil = { getFormData }
export default formDataUtil
