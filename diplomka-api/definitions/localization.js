const COOKIE = '__language'
const allowed = {
    sk: true,
    en: true
}

F.onLocale = (req, res) => {
    let {
        language
    } = req.query

    if (language) {
        if (!allowed[language]) {
            return 'en'
        }
        res.cookie(COOKIE, language, '2 days')
        return language
    }

    language = req.cookie(COOKIE)
    if (language) {
        if (allowed[language]) {
            return language
        }
        return 'en'
    }

    // Sets the language according to user-agent
    language = req.language

    if (language.indexOf('sk') > -1) {
        return 'sk';
    }

    return 'en';
};
