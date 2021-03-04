const bcrypt = require("js")
const jwt = require("jsonwebtoken")
const winston = require("winston")
const Joi = require('joi')

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
})

const schema = Joi.object().keys({
    user_id: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
})

function generateJwtToken(user) {
    const token = jwt.sign({ email: user.user_id }, 'secret_token', {
        expiresIn: 86400
    })
    return token
}

function verifyjwtToken(token) {
    jwt.verify(token, 'secret_token', function (err, decoded) {
        if (err)
            console.log(err)
        else
            console.log(decoded.foo) // bar
    })
}

function hashPassword(password) {
    return bcrypt.hashSync(password, 8)
}

function comparePassword(req_password, org_password) {
    return bcrypt.compareSync(req_password, org_password)
}

async function validateData(req, res) {
    try {
        const isValid = await Joi.validate(req.body, schema)
        return isValid
    } catch (err) {
        logger.error({ method: req.method, route: req.path, status: 500, message: "Invalid request data" })
        res.status(422).send({
            status: 'error',
            message: 'Invalid request data',
            data: req.body
        });
    }
}

function handleError(req, res) {
    logger.error({ method: req.method, route: req.path, status: 500, message: "Internal server error" })
    res.status(500).send({
        status: 500,
        success: false,
        message: 'Internal server error'
    });
}

function handleInfo(req, res, data) {
    logger.info({ method: req.method, route: req.path, status: 200, message: res.message })
    res.status(200).send({
        status: 200,
        success: true,
        message: res.message,
        data: data
    });
}

function handleInvalidInfo(req, res) {
    logger.error({ method: req.method, route: req.path, status: 403, message: "Invalid Credentials" })
    res.status(403).send({
        status: 403,
        success: false,
        message: 'Invalid Credentials'
    });
}


module.exports = {
    generateJwtToken,
    verifyjwtToken,
    hashPassword,
    comparePassword,
    handleError,
    validateData,
    handleInfo,
    handleInvalidInfo
}
