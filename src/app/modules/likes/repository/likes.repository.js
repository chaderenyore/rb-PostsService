const Repository = require("../../../Repository");
const LikesModel = require("../models/likes.models");

class LikesRepository extends Repository {
    constructor() {
        super(LikesModel);
    };
}

module.exports = new LikesRepository();