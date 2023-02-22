const Repository = require("../../../Repository");
const SuggestedModel = require("../models/suggested.models");

class SuggestedRepository extends Repository {
    constructor() {
        super(SuggestedModel);
    };
}

module.exports = new SuggestedRepository();