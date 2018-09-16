U.getSecret = () => CONFIG('secret')

U.getComposedSearchTerm = (term) => {
    if (!term) {
        return null
    }
    let temp = term.toLowerCase()
    temp = temp.replace(/[àáâãäå]/g, 'a')
    temp = temp.replace(/[ľ]/g, 'l')
    temp = temp.replace(/[š]/g, 's')
    temp = temp.replace(/[č]/g, 'c')
    temp = temp.replace(/[ť]/g, 't')
    temp = temp.replace(/[ž]/g, 'z')
    temp = temp.replace(/[řŕ]/g, 'r')
    temp = temp.replace(/[ď]/g, 'd')
    temp = temp.replace(/[ň]/g, 'n')
    temp = temp.replace(/[èéêë]/g, 'e')
    temp = temp.replace(/[ìíîï]/g, 'i')
    temp = temp.replace(/[òóôõö]/g, 'o')
    temp = temp.replace(/[ùúûü]/g, 'u')
    temp = temp.replace(/[ýÿ]/g, 'y')
    temp = temp.replace(/\W/g, '_')
    temp = temp.replace(/-+/g, '_')
    temp = temp.replace(/^-+/g, '')
    temp = temp.replace(/-+$/g, '')
    temp = temp.trim()
    temp = `_${temp}`
    return temp
}

F.helpers.escapeSpecialChars = (term) => {
    if (!term) {
        return ''
    }
    let temp = term.toLowerCase()
    temp = temp.replace(/[àáâãäå]/g, 'a')
    temp = temp.replace(/[ľ]/g, 'l')
    temp = temp.replace(/[š]/g, 's')
    temp = temp.replace(/[č]/g, 'c')
    temp = temp.replace(/[ť]/g, 't')
    temp = temp.replace(/[ž]/g, 'z')
    temp = temp.replace(/[řŕ]/g, 'r')
    temp = temp.replace(/[ď]/g, 'd')
    temp = temp.replace(/[ň]/g, 'n')
    temp = temp.replace(/[èéêë]/g, 'e')
    temp = temp.replace(/[ìíîï]/g, 'i')
    temp = temp.replace(/[òóôõö]/g, 'o')
    temp = temp.replace(/[ùúûü]/g, 'u')
    temp = temp.replace(/[ýÿ]/g, 'y')
    temp = temp.replace(/\W/g, '_')
    temp = temp.replace(/-+/g, '_')
    temp = temp.replace(/^-+/g, '')
    temp = temp.replace(/-+$/g, '')
    temp = temp.trim()
    return temp
}

F.helpers.formatDate = (date) => {
    if (!date) {
        return ''
    }
    /*
    const monthNames = [
        'Január', 'Február', 'Marec',
        'Apríl', 'Máj', 'Jún', 'Júl',
        'September', 'Október',
        'November', 'December'
    ]
    */

    const day = U.padNumber(date.getDate(), 2)
    const monthIndex = date.getMonth()
    const year = date.getFullYear()

    return `${day}.${U.padNumber(monthIndex + 1, 2)}.${year}`
}

F.helpers.formatDateWithTime = (date) => {
    if (!date) {
        return ''
    }
    const day = U.padNumber(date.getDate(), 2)
    const monthIndex = date.getMonth()
    const year = date.getFullYear()
    const hours = U.padNumber(date.getHours(), 2)
    const minutes = U.padNumber(date.getMinutes(), 2)

    return `${day}.${U.padNumber(monthIndex + 1, 2)}.${year} ${hours}:${minutes}`
}

U.padNumber = (num, size) => {
    let s = `${num}`
    while (s.length < size) s = `0${s}`
    return s
}

U.formatOnlinePlayerForResponse = (onlinePlayer) => {
    const {
        character
    } = onlinePlayer

    return {
        name: character.name,
        faction: character.faction,
        type: character.type,
        mapId: character.mapId
    }
}
