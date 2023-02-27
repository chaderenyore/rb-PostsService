const Repository = require("../../../Repository");
const CommunityPosts  = require("../models/communityPosts.model");

class CommunityPostsRepository extends Repository {
    constructor() {
        super(CommunityPosts);
    };
}

module.exports = new CommunityPostsRepository();