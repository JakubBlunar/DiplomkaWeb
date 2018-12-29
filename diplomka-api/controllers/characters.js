const Character = MODEL('database/characters').instance
const CharacterSpells = MODEL('database/characterSpells').instance
const CharacterAttributes = MODEL('database/characterAttributes').instance

exports.install = () => {
    ROUTE('/api/characters', ajaxGetCharacters, ['authorize', 'GET'])
    ROUTE('/api/characters/create', ajaxCreateCharacter, ['authorize', 'POST', '*CharacterCreate'])
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
        return self.json({
            characters
        })
    }).catch(function (err) {
        console.log(err)
        return self.throw400(err)
    })
}

function ajaxCreateCharacter() {
    const self = this

    const model = self.body.$clean()

    return DATABASE().transaction(function (transaction) {
        return getCharacter({
            name: model.name
        }, transaction).then(function (found) {
            if (found) {
                throw new Error('alreadyExists')
            }

            model.mapId = 1
            model.faction = 1
            model.positionX = 50
            model.positionY = 50
            model.accountId = self.user.id
            model.character_spells = [{
                spellType: 1
            }]
            model.character_attribute = {
                agility: 5,
                armor: 0,
                experience: 0,
                intelect: 5,
                money: 5,
                spirit: 5,
                stamina: 5,
                strength: 5
            }

            return createCharacter(model, transaction)
        }).then(function (character) {
            return self.json({
                character
            })
        }).catch(function (err) {
            return self.throw400(makeError(err))
        })
    })
}


function getCharacters(query, transaction) {
    const options = {
        where: {
            ...query
        },
        include: [{
            model: CharacterSpells
        }, {
            model: CharacterAttributes
        }]
    }

    if (transaction) {
        options.transaction = transaction
    }

    return Character.findAll(options)
}

function getCharacter(query, transaction) {
    const options = {
        where: {
            ...query
        }
    }

    if (transaction) {
        options.transaction = transaction
    }

    return Character.find(options)
}

function createCharacter(characterData, transaction) {
    return Character.create(characterData, {
        include: [CharacterAttributes, CharacterSpells],
        transaction
    });
}
