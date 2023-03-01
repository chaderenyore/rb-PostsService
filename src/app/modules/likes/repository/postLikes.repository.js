const Repository = require("../../../Repository");
const PostLikes = require("../models/postLikes.models");

class PostLikesRepository extends Repository {
    constructor() {
        super(PostLikes);
    };
}

module.exports = new PostLikesRepository();