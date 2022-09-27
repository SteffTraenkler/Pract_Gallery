const { PictureDAO, UserDAO } = require("../db-access");

async function listAllTags({ tag }) {
    const allPics = await PictureDAO.findPicByTag(tag);

    if (!allPics) {
        throw new Error("Tag doesn't exist yet.");
    }

    const allUserIdsWhoPosted = allPics.map(pic => pic.postedBy);
    const userList = await UserDAO.findUsersByIdList(allUserIdsWhoPosted);

    const userListToUserListView = userList.map(user => ({
        _id: user._id,
        username: user.username,
        profilePicture: user.profilePicture
    }));

    const tagFeedsPics = allPics.map(pic => ({
        ...pic,
        postedBy: userListToUserListView.find(u => u._id.toString() === pic.postedBy)
    }));

    return tagFeedsPics;
}

module.exports = {
    listAllTags
}