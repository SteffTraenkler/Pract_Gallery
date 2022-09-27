const { PictureDAO, UserDAO } = require("../db-access");

async function listAllPics() {
    const allPics = await PictureDAO.findAllImages();

    const allUserIdsWhoPosted = allPics.map(pic => pic.postedBy);
    const userList = await UserDAO.findUsersByIdList(allUserIdsWhoPosted);

    const userListToUserListView = userList.map(user => ({
        _id: user._id,
        username: user.username,
        profilePicture: user.profilePicture
    }));

    const mainFeedPics = allPics.map(pic => ({
        ...pic,
        postedBy: userListToUserListView.find(u => u._id.toString() === pic.postedBy)
    }));

    return mainFeedPics;
}

module.exports = {
    listAllPics
}