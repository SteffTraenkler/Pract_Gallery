const { PictureDAO } = require("../db-access");
const { makePicture } = require("../domain/Picture");

async function addPic({ picture, title, description, tags, postedBy }) {
    const newPic = makePicture({ picture, title, description, tags, postedBy });

    const insertionResult = await PictureDAO.postImg(newPic);
    const wasSuccessful = insertionResult.acknowledged === true && insertionResult.insertedId;
    if (!wasSuccessful) {
        throw new Error("Adding a new image failed, please try again");
    }

    const foundImg = PictureDAO.findImgById(insertionResult.insertedId);
    return foundImg;
}

module.exports = {
    addPic
}