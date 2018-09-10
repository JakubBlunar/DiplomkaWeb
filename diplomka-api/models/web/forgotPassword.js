NEWSCHEMA('ForgotPassword').make((schema) => {
    schema.define('email', 'Email', true)

    schema.setPrefix('errorForgotPassword-')
})
