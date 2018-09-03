const Character = MODEL('database/characters').instance

exports.install = () => {
    ROUTE('/api/characters', ajaxGetCharacters, ['authorize', 'GET'])
}

function makeError(key) {
    return new ErrorBuilder().setPrefix('errorCharacters-').push(key)
}

function ajaxGetCharacters() {
    const self = this

    const accountId = U.parseInt(self.query.accountId, -1)
    if (self.user.id !== accountId) {
        return self.throw400(makeError('wrongAccountId'))
    }

    return getCharacters({
        accountId: self.user.id
    }).then(function (characters) {
        console.log(characters)

        return self.json({
            characters
        })
    }).catch(function (err) {
        console.log(err)
        return self.throw400(err)
    })
}


function getCharacters(query, transaction) {
    const options = {
        where: {
            ...query
        }
    }

    if (transaction) {
        options.transaction = transaction
    }

    return Character.findAll(options)
}
