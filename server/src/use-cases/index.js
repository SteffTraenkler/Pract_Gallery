const { addPic } = require("./add-pic");
const { deleteYourPic } = require("./delete-your-own-pic");
const { listAllPics } = require("./list-all-pics");
const { showPic } = require("./showPic");
const { listAllTags } = require("./list-all-tags");

const { loginUser } = require("./login-user");
const { refreshUserToken } = require("./refresh-user-token");
const { showUser } = require("./show-user");
const { registerUser } = require("./register-user");
const { showProfileInfo } = require("./show-profile");
const { editProfile } = require("./edit-profile");

const PicsService = {
    addPic,
    deleteYourPic,
    listAllPics,
    showPic,
    listAllTags
};

const UserService = {
    loginUser,
    refreshUserToken,
    showUser,
    registerUser,
    showProfileInfo,
    editProfile
};

module.exports = {
    PicsService,
    UserService
}