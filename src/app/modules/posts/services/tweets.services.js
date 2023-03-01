const TweetsRepository = require("../repository/tweets.repository");

class TweetService {
  constructor() {
    this.TweetsRepository = TweetsRepository;
  }
  
  create(data) {
    return this.TweetsRepository.create(data)
  }

  findOne(query) {
    return this.TweetsRepository.findOne(query);
  }

  update(condition, update) {
    return this.TweetsRepository.update(condition, update)
  }

  getAll(limit, page, data, selectedFields) {
   return this.TweetsRepository.all(limit, page, data, selectedFields)

  }

  findById(id) {
    return this.TweetsRepository.findById(id)
  }

  deletAll() {
    this.TweetsRepository.delete({})
  }

  deletOne (condition) {
    this.TweetsRepository.delete(condition)
  }
  updateMany(condition, update) {
    return this.Model.updateMany(condition, update, {
      new: true,
      lean: true,
    });
  }
}

module.exports = TweetService;
