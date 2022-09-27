const express = require("express");
const multer = require("multer");

const { doAuthMiddleware } = require("../auth/doAuthMiddleware");
const { PicsService } = require("../use-cases");
const { imageBufferToBase64 } = require("../utils/hash");

const picsRouter = express.Router();
const pictureUploadMiddleware = multer().single("picture");

picsRouter.get("/feed", async (_, res) => {
    try {
        const result = await PicsService.listAllPics();

        res.status(200).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: { message: err ? err.message : "Unknown error while loading main feed" } });
    }
})

picsRouter.get("/tag/:tag", async (req, res) => {
    try {

        const tag = req.params.tag;
        const result = await PicsService.listAllTags({ tag });

        res.status(200).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: { message: err ? err.message : "Unknown error while trying to get tags" } });
    };
})

picsRouter.get("/:pictureId", async (req, res) => {

    try {
        const pictureId = req.params.pictureId;
        const result = await PicsService.showPic({ pictureId });

        res.status(200).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: { message: err ? err.message : "Unknown error while loading image" } });
    }

})

picsRouter.post("/add", doAuthMiddleware, pictureUploadMiddleware, async (req, res) => {
    try {

        const pictureBase64 = () =>
            req.file
                ? imageBufferToBase64(req.file.buffer, req.file.mimetype)
                : undefined;

        const result = await PicsService.addPic({
            picture: pictureBase64(),
            title: req.body.title,
            description: req.body.description,
            tags: JSON.parse(req.body.tags.toLowerCase()),
            postedBy: req.userClaims.sub
        });

        res.status(201).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: { message: err ? err.message : "Unknown error while adding new image" } });
    }
})

picsRouter.delete("/delete/:pictureId", doAuthMiddleware, async (req, res) => {

    try {
        const pictureId = req.params.pictureId;
        const userViewsId = req.userClaims.sub;

        const result = await PicsService.deleteYourPic({ pictureId, userViewsId });

        res.status(200).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: { message: err ? err.message : "Unknown error while trying to delete image" } });
    }

})

module.exports = {
    picsRouter
}