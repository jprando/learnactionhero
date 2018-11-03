'use strict'
const { Action } = require('actionhero')

module.exports = class TesteAction extends Action {
    constructor() {
        super()
        this.name = 'teste'
        this.description = 'testando AH API no linux'
        this.authenticate = true
    }

    outputExample() {
        return {
            teste: 'ok',
            nome: 'Teste Jeudi Teste Prando Teste'
        }
    }

    async run(data) {
        data.response.teste = 'ok'
        data.response.nome = 'Teste Jeudi Teste Prando Teste'
    }
}
