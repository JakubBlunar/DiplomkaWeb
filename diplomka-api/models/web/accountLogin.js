NEWSCHEMA('AccountLogin').make((schema) => {
    schema.define('login', 'String', true)
    schema.define('password', 'String', true)
    schema.define('remember', 'Boolean')

    schema.setPrefix('errorLogin-')

    schema.setValidate((name, value) => {
        switch (name) {
            case 'password':
                return value.length >= 6 && value.length <= 200
            default:
                return true
        }
    })
})
