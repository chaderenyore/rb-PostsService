const Repository = require("../../../Repository");
const ComnentLikes = require("../models/commentLikes.model");

class ComnentLikesRepository extends Repository {
    constructor() {
        super(ComnentLikes);
    };
}

module.exports = new ComnentLikesRepository();