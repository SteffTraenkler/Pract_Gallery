const crypto = require("crypto")
const jwt = require("jsonwebtoken")

function hash(input) {
    return crypto.createHash('sha256').update(input).digest('hex')
}

function createRandomSalt() {
    return crypto.randomBytes(64).toString('hex')
}

function createPasswordHash(password, salt) {
    return hash(password + salt)
}

function createToken(user, type = "access", lifespanInSeconds = 60 * 10) {
    const initiatedAt = Math.floor(Date.now() / 1000)
    const expiresAt = initiatedAt + lifespanInSeconds

    const tokenPayload = {
        sub: user._id,
        type: type,
        iat: initiatedAt,
        exp: expiresAt
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET)
    console.log("token in CreateToken", token);
    return token
}

function imageBufferToBase64(imgBuffer, mimeType) {
    return "data:" + mimeType + ";base64," + imgBuffer.toString('base64')
}

function generateRandomSixDigitCode() {
    return Math.random().toString().slice(2, 8)
}

module.exports = {
    hash,
    createRandomSalt,
    createPasswordHash,
    createToken,
    imageBufferToBase64,
    generateRandomSixDigitCode
}