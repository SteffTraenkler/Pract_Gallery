function userToUserView(user) {
    return {
        _id: user._id,
        profilePicture: user.profilePicture,
        username: user.username
    };
}

module.exports = {
    userToUserView
}