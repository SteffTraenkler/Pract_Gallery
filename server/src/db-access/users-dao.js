const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

async function findUserById(userId) {
    const db = await getDB();
    const foundUser = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    return foundUser;
}

async function findUsersByIdList(userIdList) {
    const db = await getDB();
    const foundUserList = await db.collection("users").find({ _id: { $in: userIdList.map(id => new ObjectId(id)) } }).toArray();
    return foundUserList;
}

async function findUserByEmailOrUsername(username, email) {
    const db = await getDB();
    const foundUser = await db.collection("users").findOne({
        $or: [{ username: username }, { email: email }]
    });
    return foundUser;
}

async function findUserbyUsername(username) {
    const db = await getDB();
    const foundUser = await db.collection("users").findOne({ username: username });
    return foundUser;
}

async function insertUser(userInfo) {
    const db = await getDB();
    const insertionResult = db.collection("users").insertOne(userInfo);
    return insertionResult;
}

async function updateUser(userId, updateInfo) {
    const db = await getDB();
    const updateResult = await db.collection("users").updateOne(
        { _id: new ObjectId(userId) },
        { $set: updateInfo }
    );
    return updateResult;
}

module.exports = {
    findUserById,
    findUsersByIdList,
    findUserByEmailOrUsername,
    findUserbyUsername,
    insertUser,
    updateUser
}