const { UserDAO, PictureDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { userToUserView } = require("./functions/userToUserView");

async function showUser({ username }) {
    const foundUser = await UserDAO.findUserbyUsername(username);

    if (!foundUser) {
        throw new Error("User doesn't exist anymore");
    }

    const user = makeUser(foundUser);
    const userView = userToUserView(user);

    const pics = await PictureDAO.findAllImgsOfUser(user._id.toString());

    const allUserIdsWhoPosted = pics.map(pic => pic.postedBy);
    const userList = await UserDAO.findUsersByIdList(allUserIdsWhoPosted);

    const userListToUserListView = userList.map(user => ({
        _id: user._id,
        username: user.username,
        profilePicture: user.profilePicture
    }));

    const finalPics = pics.map(pic => ({
        ...pic,
        postedBy: userListToUserListView.find(u => u._id.toString() === pic.postedBy)
    }));

    return {
        ...userView,
        images: finalPics
    };
}

module.exports = {
    showUser
}