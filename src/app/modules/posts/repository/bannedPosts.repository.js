const Repository = require("../../../Repository");
const BannedPosts  = require("../models/bannedPosts.model");

class BannedPostsRepository extends Repository {
    constructor() {
        super(BannedPosts);
    };
}

module.exports = new BannedPostsRepository();