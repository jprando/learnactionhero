'use strict'
const jsonwebtoken = require('jsonwebtoken')
const ActionHero = require('actionhero')
const JwtAuthMiddleware = require('./../src/middleware/jwtauth')

module.exports = class JwtAuth extends ActionHero.Initializer {
    constructor() {
        super()
        this.name = 'jwtauth'
        this.loadPriority = 998
        this.startPriority = 998
        this.stopPriority = 998
    }

    async initialize() {
        ActionHero.api.jwtauth = {
            processToken(token, success, fail) {
                jsonwebtoken.verify(
                    token,
                    ActionHero.api.config.jwtauth.secret,
                    {},
                    function(err, data) {
                        err ? fail(err) : success(data)
                    }
                )
            },
            generateToken(data, options, success, fail) {
                // identify parameter format
                if (typeof options == 'function') {
                    fail = success
                    success = options
                    options = {}
                } else {
                    options = options || {}
                }
                if (!options.algorithm) {
                    options.algorithm = ActionHero.api.config.jwtauth.algorithm
                }

                try {
                    var token = jsonwebtoken.sign(
                        data,
                        ActionHero.api.config.jwtauth.secret,
                        options
                    )
                    if (success) {
                        success(token)
                    }
                } catch (err) {
                    if (fail) {
                        fail(err)
                    }
                }
            }
        }

        let middleware = new JwtAuthMiddleware(ActionHero.api)
        ActionHero.api.actions.addMiddleware(middleware)
    }

    async start() {}
    async stop() {}
}
