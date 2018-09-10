NEWSCHEMA('ResetPassword').make((schema) => {
    schema.define('newPassword', 'String', true)
    schema.define('repPassword', 'String', true)
    schema.define('token', 'String')

    schema.setPrefix('errorForgotPassword-')

    schema.setValidate((name, value) => {
        switch (name) {
            case 'password':
                return value.length >= 6 && value.length <= 200
            default:
                return true
        }
    })
})
