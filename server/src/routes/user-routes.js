const express = require("express");
const multer = require("multer");



const { body } = require("express-validator");
const { UserService } = require("../use-cases");
const { doValidations } = require("../facade/doValidations");
const { doAuthMiddleware } = require("../auth/doAuthMiddleware");
const { imageBufferToBase64 } = require("../utils/hash");
const { json } = require("express");
const pictureUploadMiddleware = multer().single("profilePicture");

const userRouter = express.Router();

userRouter.get("/profile/:username", async (req, res) => {
    try {
        const username = req.params.username;

        const allUsers = await UserService.showUser({ username });

        res.status(200).json(allUsers);

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: { message: err ? err.message : "Unknown error while loading Profile" } });
    }
})

userRouter.post(
    "/login",
    body("username").isLength({ min: 1, max: 50 }),
    body("password").isStrongPassword(),
    doValidations,

    async (req, res) => {

        try {
            const result = await UserService.loginUser({
                username: req.body.username,
                password: req.body.password
            });

            if (result.refreshToken) {
                req.session.refreshToken = result.refreshToken;
            }
            console.log("token", result.token);
            res.status(200).json(result);

        } catch (err) {
            console.log("err", err);
            res.status(500).json({ err: { message: err ? err.message : "Unknown error while logging in" } });
        }
    }
)

userRouter.post("/refreshtoken", async (req, res) => {

    try {
        const result = await UserService.refreshUserToken({
            refreshToken: req.session.refreshToken || req.body.refreshToken
        });

        res.status(200).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            err: { message: err ? err.message : "Unknown error while loading token" }
        });
    }
})

userRouter.post(
    "/register",
    body("username").isLength({ min: 1, max: 35 }),
    body("email").isEmail(),
    body("password").isStrongPassword(),
    doValidations,

    async (req, res) => {

        try {
            const userInfo = req.body;
            const result = await UserService.registerUser(userInfo);

            res.status(201).json(result);

        } catch (err) {
            console.log(err);
            res.status(500).json({ err: { message: err ? err.message : "Unknown error while registering new account" } });
        }

    }
)

// userRouter.post("/verifyEmail",
//     body("email").isEmail(),
//     body("sixDigitCode").isLength({ min: 6 }),
//     doValidations,
//     async (req, res) => {

//         try{
//             const email = req.body.email
//             const sixDigitCode = req.body.sixDigitCode
//             const result = await UserService.
//         }catch(err){

//         }

//     }
// )

userRouter.get("/myProfileInfo", doAuthMiddleware, async (req, res) => {
    try {
        const userId = req.userClaims.sub;
        const allUsers = await UserService.showProfileInfo({ userId });

        res.status(200).json(allUsers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: { message: err ? err.message : "Unknown error whil loading your profile." } });
    };
})

userRouter.put("/profile/editProfile", doAuthMiddleware, pictureUploadMiddleware, async (req, res) => {
    try {
        const userId = req.userClaims.sub;

        const profileEditInfo = req.body;
        if (req.file) {
            profileEditInfo.profilePicture = imageBufferToBase64(req.file.buffer, req.file.mimetype);
        };

        const allEdits = await UserService.editProfile(userId, req.body, profileEditInfo);

        res.status(200).json(allEdits);
    } catch (err) {
        console.log("error catch inside editProfileRoute ", err);
        res.status(500).json({ err: { message: err ? err.message : "Unknown error while editing Profile." } });
    };
})

userRouter.get("profile/:username", async (req, res) => {
    try {
        const username = req.params.username;

        const allUsers = await UserService.showUser({ username });

        res.status(200).json(allUsers);
    } catch (err) {
        console.log("error catch in showUser Route", err);
        res.status(500).json({ err: { message: err ? err.message : "Unknown error while loading profile." } });
    };
});

module.exports = {
    userRouter
}