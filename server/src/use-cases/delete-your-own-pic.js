const { PictureDAO } = require("../db-access");

async function deleteYourPic({ pictureId, userViewsId }) {
    const pic = await PictureDAO.findImgById(pictureId);

    if (!pic) {
        throw new Error("Image doesn't exist anymore...");
    }

    const userId = pic.postedBy;
    const picOwner = userId === userViewsId;

    if (!picOwner) {
        throw new Error("User has nor right to delete!!");
    }

    const deletedPic = await PictureDAO.deleteImg(pic._id);

    return deletedPic;
}

module.exports = {
    deleteYourPic
}