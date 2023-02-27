const RePostsRepository = require("../repository/reposts.repository");

class RePostService {
  constructor() {
    this.RePostsRepository = RePostsRepository;
  }
  
  create(data) {
    return this.RePostsRepository.create(data)
  }

  findOne(query) {
    return this.RePostsRepository.findOne(query);
  }

  update(condition, update) {
    return this.RePostsRepository.update(condition, update)
  }

  getAll(limit, page, data, selectedFields) {
   return this.RePostsRepository.all(limit, page, data, selectedFields)

  }

  findById(id) {
    return this.RePostsRepository.findById(id)
  }

  deletAll() {
    this.RePostsRepository.delete({})
  }

  deletOne (condition) {
    this.RePostsRepository.delete(condition)
  }
  updateMany(condition, update) {
    return this.Model.updateMany(condition, update, {
      new: true,
      lean: true,
    });
  }
}

module.exports = RePostService;
