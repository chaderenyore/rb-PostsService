const BannedPostsRepository = require("../repository/bannedPosts.repository");

class BannedPostsService {
  constructor() {
    this.BannedPostsRepository = BannedPostsRepository;
  }
  
  create(data) {
    return this.BannedPostsRepository.create(data)
  }

  findARecord(query) {
    return this.BannedPostsRepository.findOne(query);
  }

  update(condition, update) {
    return this.BannedPostsRepository.update(condition, update)
  }

  getAll(limit, page, data, selectedFields) {
   return this.BannedPostsRepository.all(limit, page, data, selectedFields)

  }

  findById(id) {
    return this.BannedPostsRepository.findById(id)
  }

  deletAll() {
    this.BannedPostsRepository.delete({})
  }

  deletOne (condition) {
    this.BannedPostsRepository.delete(condition)
  }
  updateMany(condition, update) {
    return this.Model.updateMany(condition, update, {
      new: true,
      lean: true,
    });
  }
}

module.exports = BannedPostsService;
