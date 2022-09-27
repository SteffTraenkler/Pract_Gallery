function makePicture({
    _id,
    picture,
    title = "",
    description = "",
    tags = [],
    postedAt = Date.now(),
    postedBy
}) {
    if (!picture) {
        throw new Error("This is a gallery, please post an image");
    }

    if (!postedBy) {
        throw new Error("Post must include user who posted it.");
    }

    if (!postedAt) {
        throw new Error("Post must include timestamp of creation! (Praise Chronos)");
    }

    return {
        _id,
        picture,
        title: title || "Undefined",
        description,
        tags,
        postedAt,
        postedBy
    };
}

module.exports = {
    makePicture
}