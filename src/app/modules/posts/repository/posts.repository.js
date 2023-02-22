const Repository = require("../../../Repository");
const PostsModel  = require("../models/posts.model");

class PostsRepository extends Repository {
    constructor() {
        super(PostsModel);
    };
}

module.exports = new PostsRepository();