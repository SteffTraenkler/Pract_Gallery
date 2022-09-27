const { PictureDAO, UserDAO } = require("../db-access");
const { makePicture } = require("../domain/Picture");
const { makeUser } = require("../domain/User");

async function showPic({ pictureId }) {
    const foundImg = await PictureDAO.findImgById(pictureId);
    if (!foundImg) {
        throw new Error("Image with provided id not found.");
    }

    const pic = makePicture(foundImg);
    const foundUser = await UserDAO.findUserById(pic.postedBy);
    if (!foundUser) {
        throw new Error("User who posted this not found anymore...");
    }

    const user = makeUser(foundUser);

    return {
        ...pic,
        postedBy: {
            _id: user._id,
            profilePicture: user.profilePicture,
            username: user.username
        }
    };
}

module.exports = {
    showPic
}