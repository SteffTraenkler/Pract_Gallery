const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

async function findAllImages() {
    const db = await getDB();
    const allImgs = await db.collection("pictures").find().sort({ postedAt: -1, }).toArray();
    return allImgs;
}

async function findAllImgsOfUser(userId) {
    const db = await getDB();
    const allImgs = await db.collection("pictures").find({ postedBy: userId }).sort({ postedAt: -1 }).toArray();
    return allImgs;
}

async function findImgById(pictureId) {
    const db = await getDB();
    const foundImg = await db.collection("pictures").findOne({ _id: new ObjectId(pictureId) });
    return foundImg;
}

async function postImg(picture) {
    const db = await getDB();
    const insertionResult = await db.collection("pictures").insertOne(picture);
    return insertionResult;
}

async function deleteImg(pictureId) {
    const db = await getDB();
    const deletionResult = await db.collection("pictures").deleteOne({ _id: new ObjectId(pictureId) });
    return deletionResult;
}

async function addCommentToImg({ pictureId, userId, comment }) {
    const db = await getDB();

    const commentInfo = {
        postedAt: Date.now(),
        postedBy: userId,
        comment: comment
    };

    const insertionResult = await db.collection("pictures").updateOne(
        { _id: new ObjectId(pictureId) },
        { $push: { comments: commentInfo } }
    );

    return insertionResult;
}

async function findPicByTag(tag) {
    const db = await getDB();
    const allPics = await db.collection("pictures").find({ tags: tag }).sort({ postedAt: -1, }).toArray();
    return allPics;
}

//evtl noch function editImgPost (by original User)

module.exports = {
    findAllImages,
    findAllImgsOfUser,
    findImgById,
    postImg,
    deleteImg,
    addCommentToImg,
    findPicByTag
}