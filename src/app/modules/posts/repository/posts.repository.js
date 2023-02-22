const Repository = require("../../../Repository");
const Posts  = require("../models/posts.model");

class PostsRepository extends Repository {
    constructor() {
        super(Posts);
    };
}

module.exports = new PostsRepository();