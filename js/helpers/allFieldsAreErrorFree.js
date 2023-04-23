const allFieldsAreErrorFree = (obj) => {
    return Object.values(obj).every(value => value === "")
}

export default allFieldsAreErrorFree