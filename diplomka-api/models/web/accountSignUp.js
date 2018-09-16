NEWSCHEMA('AccountSignUp').make((schema) => {
    schema.define('login', 'String', true)
    schema.define('name', 'String', true)
    schema.define('surname', 'String', true)
    schema.define('password', 'String', true)
    schema.define('passwordRepeat', 'String', true)
    schema.define('email', 'String', true)


    schema.setPrefix('errorLogin-')

    schema.setValidate((name, value) => {
        switch (name) {
            case 'password':
                return value.length >= 5 && value.length <= 200
            default:
                return true
        }
    })
})
