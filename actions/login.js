'use strict'
const ActionHero = require('actionhero')

module.exports = class LoginAction extends ActionHero.Action {
    constructor() {
        super()
        this.name = 'login'
        this.description = 'autenticar usuario'
        this.outputExample = {}
        this.inputs = {
            user: { required: true },
            pass: { required: true }
        }
        this.authenticate = false
    }

    async run(data) {
        ActionHero.api.jwtauth.generateToken(
            { user: data.params.user },
            { expiresIn: '60s' },
            token => {
                data.response.token = token
            },
            err => {
                throw err
            }
        )
    }
}
