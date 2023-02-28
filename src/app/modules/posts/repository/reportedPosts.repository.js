const Repository = require("../../../Repository");
const ReportedPosts  = require("../models/reportedPosts.model");

class ReportedPostsRepository extends Repository {
    constructor() {
        super(ReportedPosts);
    };
}

module.exports = new ReportedPostsRepository();