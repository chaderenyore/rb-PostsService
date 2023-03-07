const Repository = require("../../../Repository");
const CommentLikes = require("../models/commentLikes.model");

class CommentLikesRepository extends Repository {
    constructor() {
        super(CommentLikes);
    };
}

module.exports = new CommentLikesRepository();