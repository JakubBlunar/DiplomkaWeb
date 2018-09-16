NEWSCHEMA('CharacterCreate').make((schema) => {
    schema.define('name', 'String', true)
    schema.define('type', 'Number', true)

    schema.setPrefix('errorCharacter-')

    schema.setPrepare(function (name, value) {
        switch (name) {
            case 'name':
                return value || null
            default:
                return value
        }
    })
})
