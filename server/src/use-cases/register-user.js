const { UserDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { createRandomSalt, createPasswordHash, generateRandomSixDigitCode } = require("../utils/hash");
const { sendEmail } = require("../utils/sendEmail");
const { userToUserView } = require("./functions/userToUserView");


async function registerUser({ username, email, password }) {
    const foundUser = await UserDAO.findUserByEmailOrUsername(username, email);

    if (foundUser) {
        const errorMessage =
            foundUser.username === username ?
                "Username" + username + "already taken!"
                : "Account with this email already exists!";

        throw new Error(errorMessage);
    }

    const passwordSalt = createRandomSalt();
    const passwordHash = createPasswordHash(password, passwordSalt);

    const sixDigitVerificationCode = generateRandomSixDigitCode();

    const user = makeUser({ username, email, passwordHash, passwordSalt, sixDigitVerificationCode });
    const insertionResult = await UserDAO.insertUser(user);

    const wasSuccessful = insertionResult.acknowledged === true && insertionResult.insertedId;
    if (!wasSuccessful) {
        throw new Error("Registration failed, please try again.");
    }

    await sendEmailVerification(user);

    const registeredUser = await UserDAO.findUserById(insertionResult.insertedId);
    const registeredUserView = userToUserView(registeredUser);
    return registeredUserView;

}

async function sendEmailVerification(user) {
    return await sendEmail({
        to: user.email,
        subject: "Welcome to Tweety!",
        message: `
        Hello${user.username}!

        Welcome to my Gallery Project which is NOT supposed to work nor go online this way!

        So if you get that...I either decided otherwise or someone stole it ;)

        Anyways, maybe that Code here helps. Or not! Send much love to the creators of VampireDawn and ZajiYume (you can google both right?)

        <h1>${user.sixDigitVerificationCode}</h1>

        Have blood...err...fun!
        `
    });
}


module.exports = {
    registerUser
}