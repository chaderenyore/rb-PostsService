const Repository = require("../../../Repository");
const RePosts  = require("../models/reposted.model");

class RePostsRepository extends Repository {
    constructor() {
        super(RePosts);
    };
}

module.exports = new RePostsRepository();