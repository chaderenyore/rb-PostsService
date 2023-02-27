const Repository = require("../../../Repository");
const Tweets  = require("../models/tweets.model");

class TweetsRepository extends Repository {
    constructor() {
        super(Tweets);
    };
}

module.exports = new TweetsRepository();