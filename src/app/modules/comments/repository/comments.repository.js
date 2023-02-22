const Repository = require("../../../Repository");
const Comment = require("../models/comments.models");

class CommentsRepository extends Repository {
    constructor() {
        super(Comment);
    };
}

module.exports = new CommentsRepository();