const TweetsRepository = require("../repository/tweets.repository");

class TweetService {
  constructor() {
    this.TweetsRepository = TweetsRepository;
  }
  
  async create(data) {
    return this.TweetsRepository.create(data)
  }

  async findOne(query) {
    return this.TweetsRepository.findOne(query);
  }

  async update(condition, update) {
    return this.TweetsRepository.update(condition, update)
  }

  async getAll(limit, page, data, selectedFields) {
   return this.TweetsRepository.all(limit, page, data, selectedFields)

  }

  async findById(id) {
    return this.TweetsRepository.findById(id)
  }

  async deletAll() {
    this.TweetsRepository.delete({})
  }

  async deletOne (condition) {
    this.TweetsRepository.deleteOne(condition)
  }
  async updateMany(condition, update) {
    return this.Model.updateMany(condition, update, {
      new: true,
      lean: true,
    });
  }
}

module.exports = TweetService;
