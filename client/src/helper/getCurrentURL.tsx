export const getCurrentURL = () => {
    // console.log(window.location.href)
    return window.location.href
}

export const getURLExtension = () => {
    const url = window.location.href
    const extension = url.split('0/')[1]

    return String(extension)
}