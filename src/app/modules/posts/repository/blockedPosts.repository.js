const Repository = require("../../../Repository");
const BlockedPosts  = require("../models/myBlockedPosts.model");

class BlockedPostsRepository extends Repository {
    constructor() {
        super(BlockedPosts);
    };
}

module.exports = new BlockedPostsRepository();