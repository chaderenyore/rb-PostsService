const Repository = require("../../../Repository");
const commentsModels = require("../models/comments.models");

class CommentsRepository extends Repository {
    constructor() {
        super(commentsModels);
    };
}

module.exports = new CommentsRepository();