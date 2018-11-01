'use strict'
const ActionHero = require('actionhero')
const JwtAuthMiddleware = require('./../src/middleware/jwtauth')

module.exports = class JwtAuthRegisterMiddleware extends ActionHero.Initializer {
    constructor() {
        super()
        this.name = 'jwtauth_middleware'
        this.loadPriority = 999
        this.startPriority = 999
        this.stopPriority = 999
    }

    async initialize() {
        let middleware = new JwtAuthMiddleware(this.name, ActionHero.api)
        ActionHero.api.actions.addMiddleware(middleware)
    }

    async start() {}
    async stop() {}
}
