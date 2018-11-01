'use strict'
const { Action } = require('actionhero')

module.exports = class TesteAction extends Action {
    constructor() {
        super()
        this.name = 'teste'
        this.description = 'testando AH API no linux'
        this.outputExample = {}
        this.authenticate = true
    }

    async run(data) {
        data.response.nome = 'Teste Jeudi Teste Prando Teste'
    }
}
