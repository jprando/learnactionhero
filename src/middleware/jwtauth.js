module.exports = class JwtAuthMiddleware {
    constructor(name, api) {
        this.name = name
        this.api = api
        this.global = true
        this.priority = 999
    }

    preProcessor(data) {
        if (data.actionTemplate.ignoreJWT) return
        let tokenRequired = false
        if (
            data.actionTemplate.authenticate &&
            this.api.config.jwtauth.enabled[data.connection.type]
        ) {
            tokenRequired = true
        }
        let token = ''
        let req = {
            headers:
                data.params.httpHeaders ||
                (data.connection.rawConnection.req
                    ? data.connection.rawConnection.req.headers
                    : undefined) ||
                data.connection.mockHeaders ||
                {},
            uri: data.connection.rawConnection.req
                ? data.connection.rawConnection.req.uri
                : {}
        }
        let authHeader =
            req.headers.authorization || req.headers.Authorization || false
        if (authHeader) {
            var parts = authHeader.split(' ')
            if (parts.length != 2 || parts[0].toLowerCase() !== 'token') {
                // return error if token was required and missing
                if (tokenRequired) {
                    throw new Error('Invalid Authorization Header')
                } else {
                    return
                }
            }
            token = parts[1]
        }
        if (
            !token &&
            this.api.config.jwtauth.enableGet &&
            req.uri.query &&
            req.uri.query.token
        ) {
            token = req.uri.query.token
        }
        if (tokenRequired && !token) {
            throw new Error('Authorization Header Not Set')
        } else if (token) {
            const tokenSucess = tokenData => {
                // _log('jwt auth token OK')
                data.connection._jwtTokenData = tokenData
                // _log(data.connection._jwtTokenData)
            }

            const tokenError = err => {
                console.error('jwt auth token ERROR: ', err)
                throw err
            }

            this.api.jwtauth.processToken(token, tokenSucess, tokenError)
        }
    }
}
